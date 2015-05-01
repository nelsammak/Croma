/**
 * Master Controller
 */

angular.module('angularPassportApp')
    .controller('MasterCtrl', ['$scope', '$cookieStore','$timeout','$http', MasterCtrl]);

function MasterCtrl($scope, $cookieStore,$timeout,$http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
  

    $scope.alerts = [{
        type: 'success',
        message: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    }, {
        type: 'danger',
        message: 'Found a bug? Create an issue with as many details as you can.'
    }];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
        $http.post('api/alert/'+$scope.currentUser._id, {alrts: $scope.alerts});
    };

$timeout(function(){

if($scope.currentUser){
    $http.get('api/alert/'+$scope.currentUser._id).success(function(alerts) {
      $scope.alerts=alerts;
      console.log("alerts ahe");
      });

     console.log("alerts ahe bara");
}
},500);

}