'use strict';

angular.module('angularPassportApp')
.controller('ModalCtrl', function getModal ($scope, ModalService) {

  ModalService.showModal({
    templateUrl: "currentRead.html",
    controller: "CurrentReadCtrl"
  }).then(function(modal) {

    //it's a bootstrap element, use 'modal' to show it
    modal.element.modal();
    modal.close.then(function(result) {
      console.log(result);
    });
  });

);)