/**
 * Alerts Controller
 */

angular
    .module('angularPassportApp')
    .controller('AlertsCtrl', function AlertsCtrl($scope,$http) {
     $scope.alerts = [{
        type: 'success',
        message: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    }, {
        type: 'danger',
        message: 'Found a bug? Create an issue with as many details as you can.'
    }];

    $http.get('api/alert/'+$scope.currentUser._id).success(function(alerts) {
      $scope.alerts=alerts;
      console.log("alerts ahe", alerts);
      });
   
    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});