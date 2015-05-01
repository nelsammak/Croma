angular.module('angularPassportApp')
  .controller('BookClubsCtrl', function($scope, $http, $location, $modal, ShareService) {

      $http.post('api/bookclubs', {userId: $scope.currentUser._id}).success(function(response) {
        console.log("I received the DATA");
        $scope.bookClubs = response;
      });

  });

angular.module('angularPassportApp')
  .controller('BookClubsCtrl2', function($scope, $http, $location, $modal, ShareService) {
    $scope.submit = function() {
      if ($scope.myForm.input.$valid) {
        $http.post('api/bookclubs/createbookclub', {
          title: $scope.title,
          userId: $scope.currentUser._id
        })
          .success(function (bool) {
            console.log("Added the new book club");
          })
      }
      ;
    }
  });