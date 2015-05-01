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

angular.module('angularPassportApp')
  .controller('BookClubsCtrl3', function($scope, $http, $location, $modal, ShareService) {
    $scope.viewBookClub = function(id) {
      $location.path('bookclubs/' + id);
      ShareService.setValue(id);
      $scope.id = ShareService.getValue();
    }
  });

angular.module('angularPassportApp')
  .controller('BookClubsCtrl4', function($scope, $http, $location, $modal, ShareService) {
      $http.get('api/bookclubs/' + ShareService.getValue()).success(function(response) {
        console.log(ShareService.getValue());
        console.log(response.name);
        $scope.posts = response.posts;
        $scope.name = response.name;
        $scope.id = response._id;
      });

    $scope.addPost = function(id) {
      $location.path('addpost/' + id);
      ShareService.setValue(id);
    }
  });

angular.module('angularPassportApp')
  .controller('BookClubsCtrl5', function($scope, $http, $location, $modal, ShareService) {
    var id = ShareService.getValue();
    $scope.success = false;
    $scope.submit = function() {
      if (!$scope.success && $scope.myForm.input.$valid) {
        $http.post('api/addpost/' + id, {
          title: $scope.title,
          text: $scope.text,
          userId: $scope.currentUser._id
        })
        .success(function (response) {
          $scope.success = true;
          console.log("Added the Post");
        })
      };
    }
  });