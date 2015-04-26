//a service to pass id  from books Ctrl to book Ctrl
angular.module('angularPassportApp')
 .service('ShareService', function(){
    var id = 0;
    return {
            getValue: function () {
                return id;
            },
            setValue: function(value) {
                id = value;
            }
        };
 
});

 //a service to pass genre  from Genre Ctrl to Genre display Ctrl
angular.module('angularPassportApp')
 .service('ShareService2', function(){
    var genre = '';
    return {
            getValue: function () {
                return genre;
            },
            setValue: function(value) {
                genre = value;
            }
        };
 

});
