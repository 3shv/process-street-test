(function () {
    'use strict';
    angular
        .module('app.directives')
        .directive('uploadWidget', uploadWidget);

    uploadWidget.$inject = ['$timeout', '$interval'];



    function uploadWidget($timeout, $interval) {
        return {
            restrict: 'E',
            scope: {
                id: '@'
            },
            templateUrl: 'templates/uploadWidget.html',
            link: function(scope, element, attr) {

                var timeoutId;
                var url = 'https://upload.wistia.com/?api_password=';
                var api_password = '78166fb04601c4addab49b480e51a8a3a4e89794c27fbe679c6f98b418fb5460';
                var project_id = 'ts9gplbvzu';
                var hashed_id;

                angular.element('#'+scope.id).fileupload({
                    url: url + api_password + '&project_id=' + project_id,
                    sequentialUploads: true
                }).bind('fileuploaddone', function (e, data) {
                    console.log(data.result);
                    hashed_id = data.result.hashed_id;
                    var video_class = 'wistia_async_'+hashed_id;
                    angular.element('#embed_video').append(
                        ''+
                        '<div class="wistia_embed '+ video_class +'"'+
                        'style="height:360px;width:640px">' +
                        '</div>'
                    );
                })
                .bind('fileuploadfail', function (e, data) {
                    console.log(data.result);
                });


                timeoutId = $interval(function() {
                    var progress = angular.element('#'+scope.id).fileupload('progress');
                    scope.overallProgress = (progress.loaded*100)/progress.total;
                }, 1000);
                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });
            }
        };
    }
})();