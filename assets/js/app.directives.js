(function () {
    'use strict';
    angular
        .module('app.directives')
        .directive('uploadWidget', uploadWidget);

    uploadWidget.$inject = ['$timeout', '$interval'];



    function uploadWidget($timeout, $interval) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'templates/uploadWidget.html',
            link: function(scope, element, attr) {

                var timeoutId;
                var api_password = '78166fb04601c4addab49b480e51a8a3a4e89794c27fbe679c6f98b418fb5460';
                var project_id = 'ts9gplbvzu';
                $('#fileupload').fileupload({
                    url: 'https://upload.wistia.com/?api_password='+api_password+'&project_id='+project_id,
                    sequentialUploads: true
                }).bind('fileuploaddone', function (e, data) {
                    console.log(data.result);
                })
                .bind('fileuploadfail', function (e, data) {
                    console.log(data.result);
                })

                //var overallProgress;
                timeoutId = $interval(function() {
                    var progress = $('#fileupload').fileupload('progress');
                    scope.overallProgress = (progress.loaded*100)/progress.total;
                }, 1000);
                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });
            }
        };
    }
})();