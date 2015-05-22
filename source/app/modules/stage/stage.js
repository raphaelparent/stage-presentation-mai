StageApp = angular.module('StageApp', ['ngAnimate']);

(function(StageApp){
    'use strict';
    StageApp.config(function( $controllerProvider ){

        // Set Controller Register helper
        // ================================================
        StageApp.controller = $controllerProvider.register;

    });

})(StageApp);