'use strict';

angular.module('angularPassportApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });
