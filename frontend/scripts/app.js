'use strict';

// fileStorage.filePath = EPUBJS.filePath;

angular.module('Reader', ['ngTouch'])
  .config(function ($locationProvider) {
    
    $locationProvider.html5Mode(true);
      
  })
  .run(function($rootScope) {
    
    $rootScope.contentsPath = '';
    
    $rootScope.metadata = {bookTitle: 'TDO'};
    
  });