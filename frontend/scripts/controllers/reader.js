angular.module('angularPassportApp')
    .controller('ReaderController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

        var Book = ePub("/books/bookEpub/J R R Tolkien - The Lord of the Rings - 50th Anniversary, One Vol. Edition (epub).epub");
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                var are = $('#area')[0];

                console.log(are);


                Book.getToc().then(function(toc) {

                    var $select = document.getElementById("toc"),
                        docfrag = document.createDocumentFragment();

                    toc.forEach(function(chapter) {
                        var option = document.createElement("option");
                        option.textContent = chapter.label;
                        option.ref = chapter.href;

                        docfrag.appendChild(option);
                    });

                    $select.appendChild(docfrag);

                    $select.onchange = function() {
                        var index = $select.selectedIndex,
                            url = $select.options[index].ref;

                        Book.goto(url);
                        return false;
                    }

                });

                Book.ready.all.then(function() {
                    document.getElementById("loader").style.display = "none";
                });

                Book.renderTo(are).then(function(argument) {
                    console.log(argument);
                });
            }, 0);
        });

        $scope.nextPage = function() {
            Book.nextPage();
        }

        $scope.prevPage = function() {
            Book.prevPage();
        }



    }]);
