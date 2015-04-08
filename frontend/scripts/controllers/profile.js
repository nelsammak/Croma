'use strict'
angular.module('angularPassportApp')
.controller('ProfileController', ['$scope', '$http',
	function sendUserInfo ($scope, $http) {
		// var id = $rootScope.currentUser._id;
		$http.get('api/users/' + $scope.currentUser._id).success(function(response) {
			console.log('scope current user', $scope.currentUser._id);
			console.log(response);
		 	$scope.userInfo=response;

$scope.editedInfo=$scope.userInfo;
$scope.editorEnabled = false;

   $scope.enableEditor = function() {
     $scope.editorEnabled = true;
     $scope.editableTitle = $scope.editedInfo;
   };

   $scope.disableEditor = function() {
     $scope.editorEnabled = false;
   };

   $scope.save = function() {
     $scope.editedInfo= $scope.editableTitle;
     $scope.disableEditor();
 $scope.addInfo = function() {
        $http.post('api/users/', $scope.editedInfo)
            .success(function(data) {
                $scope.userInfo = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
     

  };
      
    });
	}
]);


/*
$scope.addInfo = function() {
       console.log($scope.editedInfo);
        $http({
            method: 'POST',
            url: 'api/profile',
            data: $scope.editedInfo
        }).
        success( function(response) {
            console.log("success");
        }).
        error( function(response) {
            console.log("error");
        });

    };

angular.module('angularPassportApp')
.controller('ClickToEditCtrl',function ($http,$scope) {
  $scope.title = "Enter";
$scope.editorEnabled = false;

  $scope.enableEditor = function() {
    $scope.editorEnabled = true;
    $scope.editableTitle = $scope.title;
$http.post('/user', data).success(successCallback);
  };

  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  };

  $scope.save = function() {
    $scope.title = $scope.editableTitle;
    $scope.disableEditor();
    $scope.addInfo = function() {
       //console.log($.param($scope.user));
        $http({
            method: 'POST',
            url: 'api/users',
            data: $.param($scope.title)
        }).
        success( function(response) {
            console.log("success");
        }).
        error( function(response) {
            console.log("error");
        });

    };

  };

});*/

/*angular.module('angularPassportApp')
.controller('ProfileController', ['$scope','$routeParams', 'Profile',
	function sendUserInfo ($scope, $routeParams , Profile) {
		$scope.userInfo = Profile.get({userId: $routeParams.userId}, function(userInfo) {
      $scope.profileImage = userInfo.profilephoto;
    });
	
/*$scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
	} 
]);*/
/*
directive('fileInput',['$parse',function($parse){
	return{
		restrict:A,
		link:function(scope,elm,attrs){
			elm.bind('change',function(){
				$parse(attrs.fileInput)
				.assign(scope,elm[0].files)
				scope.$apply()
			})
		}
	}
}])
controller('uploader',['$scope','$http',
function($scope,$http){
	$scope.files=elm.files
	$scope.$apply();
}
$scope.upload=function(){
	var fd=new FormData()
	angular.forEach($scope.files,function(file){
		fd.append('file',file)
	})
	$http.post('upload.ashx',fd,
	{
		transformRequest:angular.identity,
		headers:{'Content-Type':undefined}
	})
	.success(function(d)){
		console.log(d)
	})
	
}
}
])
*/

// <div ng-app>
//   <div ng-controller="ClickToEditCtrl">
//     <div ng-hide="editorEnabled">
//       {{profile.firstName}}
//       <a href="#" ng-click="editorEnabled=!editorEnabled">Edit</a>
//     </div>
//     <div ng-show="editorEnabled">
//       <input ng-model="profile">
//       <a href="#" ng-click="editorEnabled=!editorEnabled">Done editing?</a>
//     </div>
//   </div>
// </div>
