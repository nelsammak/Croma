'use strict';

var profileServices = angular.module('profileServices', ['ngResource']);

profileServices.factory('Profile', ['$resource',
  function($resource){
    return $resource("/api/user/:id/", {}, {
      query: {method:'GET', params:{id:'user'}, isArray:true}
    });
  }]);



