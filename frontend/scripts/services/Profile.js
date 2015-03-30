'use strict';

angular.module('angularPassportApp')
.factory('Profile', ['$resource',
  function($resource){
    return $resource("/api/user/:id", {}, {
      query: {method:'GET', params:{id:'userId'}, isArray:true}
    });
  }]);



