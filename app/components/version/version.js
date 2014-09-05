'use strict';

angular.module('gSoft.version', [
  'gSoft.version.interpolate-filter',
  'gSoft.version.version-directive'
])

.value('version', '0.1');
