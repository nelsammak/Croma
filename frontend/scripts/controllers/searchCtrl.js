angular.module('angularPassportApp')
.controller('searchCtrl', function($scope ,$location, $http, searchService) {
     
  /**
  * @function watchSearchTerm 
  * watches searchTerm every 500 ms then calls Search from searchService with term
  * @params {String} tmpString - Temporary String 
  */
     $scope.$watch('searchTerm', function watchSearchTerm (tmpStr)
    {
      if (tmpStr.length == 0) {
            $location.path('/');
            return 0; 
      }
      if (!tmpStr) {
        return 0;
      }
        // if searchTerm is still the same retrieve data
        if (tmpStr === $scope.searchTerm)
        {
           searchService.search(tmpStr);
        }
    });

});