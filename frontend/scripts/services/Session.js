'use strict';

angular.module('angularPassportApp')
  .factory('Session', function ($resource) {
    return $resource('/api/sessions/');
  });
