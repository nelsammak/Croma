angular.module('angularPassportApp')
    .controller('ReaderController', function($scope, $http, $timeout, $rootScope, $cookieStore) {
        
    	$scope.bookPath = $cookieStore.get('book').text;

        console.log('$scope.bookPath', $scope.bookPath);

        var Book = ePub($scope.bookPath, { restore: true ,  spreads: true});

        



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


                Book.getMetadata().then(function(metadata) {
                    var title = document.getElementById("book-title");
                    title.textContent = metadata.bookTitle + ' - ' + metadata.creator;
                })

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


    });
