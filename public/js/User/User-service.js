'use strict';

angular.module('Croma')
  .factory('User', ['$resource', function ($resource) {
    return $resource('Croma/Users/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
