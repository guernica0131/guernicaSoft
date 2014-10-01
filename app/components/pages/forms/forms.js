 angular.module('gSoft.formsPage', ['gSoft.noSpace'])

 .directive('formsPage', function() {
     return {
         restrict: 'E',
         templateUrl: 'components/pages/forms/forms.html', // remove loadpage once on webserver
         controller: function($scope, $q, Constants, Intercom, LoadPage) {

             $scope.formData = {};
             $scope.feedback = {};
             /*
              * Privates
              */

             // allows us to comminicate form states to listening modules
             var broadcast = function(verb, message, payload) {

                 var broadcast = {
                     'verb': verb,
                     'message': message
                 };

                 if (payload)
                     broadcast.payload = payload;

                 Intercom.broadcast('forms', broadcast);

             }

             var setCSS = function(valid, element) {

                 var base = $scope.feedback.base;
                 // reset all
                 $scope.feedback[base][element.model]['feedback'].bad = false;
                 $scope.feedback[base][element.model]['feedback'].good = false;
                 $scope.feedback[base][element.model]['feedback'].warning = false;

                 var feedback = element['feedback'];


                 if (!valid) { // need to test the text, need element
                     $scope.feedback[base][element.model]['feedback'].bad = true;
                     if (feedback && feedback['errorHelpText'])
                         $scope.feedback[base][element.model]['text'] = element['feedback']['errorHelpText'];
                 } else if (valid === -1) {
                     $scope.feedback[base][element.model]['feedback'].warning = true;
                     if (feedback && feedback['warningHelpText'])
                         $scope.feedback[base][element.model]['text'] = element['feedback']['warningHelpText'];
                 } else if (valid === 1) {
                     $scope.feedback[base][element.model]['feedback'].good = true;
                     if (feedback && feedback['goodHelpText'])
                         $scope.feedback[base][element.model]['text'] = element['feedback']['goodHelpText'];
                 } else {
                     // we set the default text
                     if (feedback && feedback['helpText'])
                         $scope.feedback[base][element.model]['text'] = element['feedback']['helpText'];

                 }

                 return valid;
             }

             // we use this function for iterating the elements on the page. We get this from the elements array
             var scanElements = function(form, callback) {
                 var elements = form.elements,
                     // we assume all are valid
                     allValid = true;

                 for (var el in elements) {
                     // now we need to make some changes
                     // if this is required, we need to check if there is data
                     if (elements[el].required) {
                         // if this becomes invalid
                         try {
                             var isValid = validateFormElement(elements[el], form);
                             // we set allValid to be false
                         } catch (e) {
                             console.error(e);
                             var isValid = true; // we won't hold up form processing for unsoleved condition'
                         }

                         if (!isValid)
                             allValid = false;
                     }

                 }
                 // once finished we run our callback
                 callback(allValid);
             };
             /*
              * We create a promise. This could be one or a several elements we need to validate.
              * this is for performance conciderations
              */
             var beginProcessing = function(form) {

                 // create the deferred object
                 var deferred = $q.defer();

                 scanElements(form, function(allValid) {
                     // once finished we resolve
                     deferred.resolve(allValid);
                 });

                 return deferred.promise;
             };
             // function for running a join operation on arrays
             var join = function(elements, seperator) {
                 if (!seperator)
                     seperator = ' ';
                 if (!elements || !elements.length)
                     return '';

                 return elements.join(seperator);
             };

             // this clears all elements
             var clearClasses = function(form) {
                 // interate the elements
                 angular.forEach(form.elements, function(el, index) {
                    // 2 will trigger no condition other than the reset options
                     setCSS(2, el);
                 });

                 broadcast('clearing', "The form data has been cleared.");

             };
             // this allows us to clear and individual form element 
             var validateFormElement = function(element, form) {
                 // this closure is where we can ensure inputs
                 // are valid @TODO, this is disabled for now
                 var validators = (function() {

                         var regex = {
                             email: /\S+@\S+\.\S+/,
                             text: /\S+/, // duplication 1
                             radio: /\S+/, // duplication 1
                             textarea: /\S+/, // deplication 1 
                             number: /^\d+$/,
                             password: /^$|\s+/,
                             select: /\S+/ // deplication 1 
                         };
                         // assign string keys for getting the functions
                         // uses less space than actual functions
                         var keys = {
                             input: {
                                 email: 'getRegex',
                                 text: 'getRegex',
                                 number: 'getRegex',
                                 password: 'getRegex',
                                 checkbox: 'getRegex',
                             },
                             selectMultiple: 'findLength',
                             select: 'getRegex',
                             textarea: 'getRegex',
                             radio: 'getRegex'
                         };

                         var functionals = {
                             findLength: function(content, type) {
                                 if (!content)
                                     return 0;
                                 return (content.length > 0) ? 1 : 0;
                             },

                             getRegex: function(content, type) {
                              //  console.log("COntent", content.match(regex[type]));
                                 return (content.match(regex[type]) !== null) ? 1 : 0;
                             },

                             checkbox: function(content, type) {
                                 //return $_el.is(':checked');
                                 return 1; // @TODO replace
                             }

                         };

                         var validate = function(element, content) {

                             var valid = keys[element.el];

                             if (element.type)
                                 valid = valid[element.type];

                             if (!valid)
                                 throw "I cannot handle a/an " + element.el + " element type"

                             return functionals[valid](content, element.type);

                         };

                         return {
                             validate: validate
                         }

                     })(),
                     base = $scope.feedback.base,
                     min = element.min || 0,
                     content = ($scope.formData[base][element.model]) ? $scope.formData[base][element.model] : '', //$_el.val(),
                     length = (content) ? content.length : 0;

                 // we have an empty element that is required we return 0
                 if ((!content || length < min) && element.required)
                     return setCSS(0, element);
                 // here we've got an element that isn't complete but isn't required
                 else if ((!content || length < min) && !element.required) 
                     return setCSS(-1, element); // we set warning

                 // now we use validators to get the result
                 // return setCSS(validators.validate(element, content), element); // need to reconsider
                    return setCSS((content && length >= min) ? 1 : 0, element); // for now

             };

             // here we broadcase that our form is getting intialized
             broadcast('initializing', "Intializing form data");

             /*
              * Scoped functions
              */
              // we init here
             $scope.setFeedback = function(setup) {
                 // we set our base key for reference
                 if (!$scope.feedback.base)
                     $scope.feedback.base = setup.base;
                 // we only initialize our feedback once
                 if (!$scope.feedback.instructions)
                     $scope.feedback.instructions = setup.feedback;
                 // now we set the global model base
                 if (!$scope.feedback[setup.base])
                     $scope.feedback[setup.base] = {};
                 // now we create a new instance for this model
                 if (!$scope.feedback[setup.base][setup.model])
                     $scope.feedback[setup.base][setup.model] = {};

                 // we intialize all feedback elements to false
                 $scope.feedback[setup.base][setup.model]['feedback'] = {
                     good: false,
                     bad: false,
                     warning: false
                 };


             };

             $scope.setClasses = function(element, model) {

                 var instructions = $scope.feedback.instructions[element];
                 // if we have no instructions, we return
                 if (!instructions)
                     return;

                 // tons of string work for getting the correct classes and modes
                 var g = '.good,',
                     b = '.bad,',
                     w = '.warning,',
                    separator = ":feedback." + $scope.feedback.base + "." + model + ".feedback";


                 // our good classes
                 var good = (instructions.GOOD && instructions.GOOD.length > 0) ?
                     (instructions.GOOD.length === 1) ? instructions.GOOD[0] + separator + g : // nested to return 1 or many results
                     join(instructions.GOOD, separator + g) + separator + g : ''; // otherwise we return nothing4
                 // our bad
                 var bad = (instructions.BAD && instructions.BAD.length > 0) ?
                     (instructions.BAD.length === 1) ? instructions.BAD[0] + separator + b : // nested to return 1 or many results
                     join(instructions.BAD, separator + b) + separator + b : ''; // otherwise we return nothing
                 // our warnings
                 var warning = (instructions.WARNING && instructions.WARNING.length > 0) ?
                     (instructions.WARNING.length === 1) ? instructions.WARNING[0] + separator + w : // nested to return 1 or many results
                     join(instructions.WARNING, separator + w) + separator + w : ''; // otherwise we return nothing
                // we need to chop off training commas
                 if (warning && warning.charAt(warning.length - 1) === ',')
                     warning = warning.slice(0, -1);
                 else if (!warning && bad && bad.charAt(bad.length - 1) === ',')
                     bad = bad.slice(0, -1);
                 else if (!bad && good && good.charAt(good.length - 1) === ',')
                     good = good.slice(0, -1);
                 return '{' + good + bad + warning + '}';

             };
             // join turns an array of opbjects into classes. We use the 
             // seperator for potential future functionality
             $scope.join = join;
             /*
              * @TODO implement for live validation
              */
             $scope.checkChange = function(element, form) {
                 // consider the performace implcations. Disabled for now
                 if (Constants.FORMS.BROADCAST_CHANGES || form.liveChanges)
                     broadcast('change', "There is invalid input in the form.", $scope.formData.contact);
                 // if we trigger liveFeedback, we proceed
                 if (element.liveFeedback) {

                     try {
                         validateFormElement(element, form);
                     } catch (e) {
                         console.error(e);
                     }

                 }

             };

             /*
              * @TODO Remove after testing. It seems that change function covers all use cases
              */
             $scope.validate = function(element, form) {
                 return true;
             };
             /*
              * Called by the view for processing
              */
             $scope.processForm = function(form) {
                 broadcast('validating', "All fields are being validated...");

                 return beginProcessing(form).then(function(isValid) {

                     if (!isValid) {
                         // here we broadcase that our form is getting intialized
                         return broadcast('invalid', "There is invalid input in the form.");
                     }
                     // here we fake a call to a webserver for processing
                     var payload = $scope.formData[form.baseModel];
                     // we now indicate that we are ready to process the form
                     broadcast('processing', "The form data is currently being validated.", payload);
                     // mimics call to webserver
                     LoadPage.timeout(3000).then(function() {
                         broadcast('complete', "The form has processed successfully.", payload);
                     });

                 });
             };

             $scope.checkButtonResponse = function(btn, form) {

                 switch (btn.type) {
                     case 'reset': // for now we only have one case.

                         clearClasses(form);
                         break;
                     default:
                         // do nothing

                 }

             };

         },
         controllerAs: 'formsPageCtrl',
         scope: true
     }
     P
 });