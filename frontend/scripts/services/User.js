'use strict';

angular.module('croma')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });
