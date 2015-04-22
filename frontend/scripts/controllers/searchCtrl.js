/**
 * Create a controller to interact with the UI.
 */
angular.module('angularPassportApp')
.controller('searchCtrl', function($scope ,$location, $http, searchService) {
     $scope.$watch('searchTerm', function (tmpStr)
    {
      if (!tmpStr || tmpStr.length == 0) {
            return 0; 
      }
        // if searchTerm is still the same retrieve data
        if (tmpStr === $scope.searchTerm)
        {
           searchService.search(tmpStr);
        }
    });

});