//Controller to get the Book Clubs the user is in
angular.module('angularPassportApp')
  .controller('BookClubsCtrl', function($scope, $http, $location, $modal, ShareService) {

      $http.post('api/bookclubs', {userId: $scope.currentUser._id}).success(function(response) {
        console.log("I received the DATA");
        $scope.bookClubs = response;
      });

  });

//Controller for the form to create a Book Club
angular.module('angularPassportApp')
  .controller('BookClubsCtrl2', function($scope, $http, $location, $modal, ShareService) {
    $scope.success = false;
    $scope.submit = function() {
      if (!$scope.success && $scope.myForm.input.$valid) {
        $http.post('api/bookclubs/createbookclub', {
          title: $scope.title,
          userId: $scope.currentUser._id
        })
        .success(function (response) {
            $scope.success = true;
            console.log("Added the Book Club");
        })
      };
    }
  });

//Controller to view a specific Book Club
angular.module('angularPassportApp')
  .controller('BookClubsCtrl3', function($scope, $http, $location, $modal, ShareService) {
    $scope.viewBookClub = function(id) {
      $location.path('bookclubs/' + id);
      ShareService.setValue(id);
      $scope.id = ShareService.getValue();
    }
  });

//Controller to get the Book Club's name and posts
angular.module('angularPassportApp')
  .controller('BookClubsCtrl4', function($scope, $http, $location, $modal, ShareService) {
      $http.get('api/bookclubs/' + ShareService.getValue()).success(function(response) {
        $scope.posts = response.posts;
        $scope.name = response.name;
        $scope.id = response._id;
        $scope.adminOfBookClub = $scope.currentUser._id == response.creator.toString();
      });

    $scope.addPost = function(id) {
      $location.path('addpost/' + id);
      ShareService.setValue(id);
    }
  });

//Controller for the form to add a Book Club Post
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

angular.module('angularPassportApp')
  .controller('BookClubsCtrl6', function($scope, $http, $location, $modal, ShareService) {
    var id = ShareService.getValue();
    $scope.success = false;
    $scope.invitedUsername = "";
    $scope.submit = function() {
        console.log($scope.user);
        $http.post('api/invitetobookclub/' + id, {
          title: $scope.name,
          user: $scope.user
        })
          .success(function (response) {
            $scope.invitedUsername = $scope.myForm.input.User;
            $scope.success = true;
            console.log("Invited the User");
          })
    }
  });

//Controller to view a specific Post
angular.module('angularPassportApp')
  .controller('BookClubsCtrl7', function($scope, $http, $location, $modal, ShareService) {
    $scope.viewPost = function(id) {
      $location.path('posts/' + id);
      ShareService.setValue(id);
      $scope.id = ShareService.getValue();
    }
  });

//Controller to get the Post's comments
angular.module('angularPassportApp')
  .controller('BookClubsCtrl8', function($scope, $http, $location, $modal, ShareService) {
    $http.get('api/posts/' + ShareService.getValue()).success(function(response) {
      $http.get('api/getusername/' + response.poster).success(function(username) {
        $scope.poster = username;
        $scope.title = response.title;
        $scope.post = response.post;
        $scope.comments = response.comments;
        $scope.id = ShareService.getValue();
      });
    });

    $scope.addComment = function(id) {
      console.log("hihi");
      console.log(id);
      $location.path('addcomment/' + id);
      ShareService.setValue(id);
    }
  });

//Controller for the form to add a Comment
angular.module('angularPassportApp')
  .controller('BookClubsCtrl9', function($scope, $http, $location, $modal, ShareService) {
    var id = ShareService.getValue();
    $scope.success = false;
    $scope.submit = function() {
      if (!$scope.success) {
        $http.post('api/addcomment/' + id, {
          comment: $scope.text,
          name: $scope.currentUser.username,
          userId: $scope.currentUser._id
        })
          .success(function (response) {
            $scope.success = true;
            console.log("Added the Comment");
          })
      };
    }
  });