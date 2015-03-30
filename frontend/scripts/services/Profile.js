'use strict';

angular.module('angularPassportApp')
.factory('Profile', ['$resource',
  function($resource){
    return $resource("/api/users/:id", {}, {
      query: {method:'GET', params:{id:'users'}, isArray:true}
    });
  }]);



//, ['ngResource']