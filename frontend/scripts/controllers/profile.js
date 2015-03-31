'use strict'
angular.module('angularPassportApp')
.controller('ProfileController', ['$scope', '$http',
	function sendUserInfo ($scope, $http) {
		$http.get('api/users/550c63a6d4d5f5280d565015').success(function(response) {
			console.log(response);
		 	$scope.userInfo=response;
		});
	}
]);


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
