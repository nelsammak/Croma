//a service to pass id  from books Ctrl to book Ctrl
angular.module('angularPassportApp')
 .service('ShareService', function(){
    var id = 0;
  
    return {
            /**
           * @function getValue
           * gets value of id of book
           * @return {int} {id: 'id of a book'} 
           */
            getValue: function () {
                return id;
            },
            /**
            * @function setValue
            * sets value of id of book
            */
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
            /**
           * @function getValue
           * gets value of  genre name
           * @return {String} {genre: 'genre name'} 
           */
            getValue: function () {
                return genre;
            },
            /**
            * @function setValue
            * sets value of genre name
            */
            setValue: function(value) {
                genre = value;
            }
        };
 

});
