angular.module('angularPassportApp')
.controller('searchCtrl', function($scope ,$location, $http, searchService) {
     
  /**
  * @function watchSearchTerm 
  * watches searchTerm every 500 ms then calls Search from searchService with term
  * @param {String} tmpString - Temporary String 
  */
     $scope.$watch('searchTerm', function watchSearchTerm (tmpStr)
    {
      if (typeof tmpStr == 'undefined') {
            return 0; 
      }
      if (tmpStr.length == 0) {
        $location.path('/');
        return 0;
      }
        // if searchTerm is still the same retrieve data
        if (tmpStr === $scope.searchTerm)
        {
           searchService.search(tmpStr);
        }
    });

});
