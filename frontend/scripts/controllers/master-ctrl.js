/**
 * Master Controller
 */

angular.module('angularPassportApp')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$interval', '$http', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $interval, $http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.alerts = [];

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = !$cookieStore.get('toggle') ? false : true;
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

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
        $http.post('api/alert/' + $scope.currentUser._id, {
            alrts: $scope.alerts
        });
    };

    $interval(function() {

        if ($scope.currentUser) {
            $http.get('api/alert/' + $scope.currentUser._id).success(function(alerts) {
                if ($scope.alerts.length < alerts.length) {
                    $('#bell').addClass('animated swing');
                }
                $scope.alerts = alerts;

            });
            $('#bell').removeClass('animated swing');
        }

    }, 5000);

}
