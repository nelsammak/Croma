
angular.module('angularPassportApp')
.controller('ReaderController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    var Book = ePub("/moby-dick/");
     $scope.$on('$viewContentLoaded', function(event) {
      $timeout(function() {
         var are = $('.area:last')[0];

         console.log(are);
        Book.renderTo(are).then( function  (argument) {
            console.log(argument);
        });
      },0);
    });

     $scope.nextPage = function() {
        Book.nextPage();
     }

     $scope.prevPage = function() {
        Book.prevPage();
     }



    }
]);
