/**
 * Create a controller to interact with the UI.
 */
angular.module('angularPassportApp')
.controller('searchCtrl', function($scope,$location, $http, $cookieStore) {
    console.log('LOCATION ', $location)
     $scope.$watch('searchTerm', function (tmpStr)
    {
      console.log('TEMP STRING', tmpStr);
      if (!tmpStr || tmpStr.length == 0) {
            return 0; 
      }
        // if searchTerm is still the same retrieve data
        if (tmpStr === $scope.searchTerm)
        {
            $http.get('/api/search', {
                params: {searchTerm: $scope.searchTerm} 
            }).success(function (response) {
                $scope.users = response.users;
                $scope.books = response.books;
                $location.path('/searchResults')
            });
        }
    });

});