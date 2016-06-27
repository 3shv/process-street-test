(function () {
    'use strict';

    angular
        .module('app.config')
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider, fileUploadProvider) {
    }

})(angular);