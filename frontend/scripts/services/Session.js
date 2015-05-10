'use strict';

angular.module('croma')
  .factory('Session', function ($resource) {
    return $resource('/api/sessions/');
  });
