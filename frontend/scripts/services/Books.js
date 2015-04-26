//a service to pass id  from books Ctrl to book Ctrl
angular.module('angularPassportApp')
 .service('ShareService', function(){
    var id = 0;
  
  /**
  * @function getValue
  * gets value of id of book
  * @return {int} {id: 'id of a book'} 
  */
  this.getValue = function getValue () {
    return id;
  }
  /**
  * @function setValue
  * sets value of id of book
  */
  this.setValue = function setValue(value) {
    id = value;
  }
});

 //a service to pass genre  from Genre Ctrl to Genre display Ctrl
angular.module('angularPassportApp')
 .service('ShareService2', function(){
    var genre = '';

  /**
  * @function getValue
  * gets value of  genre name
  * @return {String} {genre: 'genre name'} 
  */
  this.getValue = function getValue () {
    return genre;
  }
  /**
  * @function setValue
  * sets value of genre name
  */
  this.setValue = function setValue(value) {
    genre = value;
  }

 

});
