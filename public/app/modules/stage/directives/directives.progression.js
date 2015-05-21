(function(StageApp) {

    StageApp.directive('progressionBar', [
        function() {

            return {
                restrict: 'A',
                templateUrl: './templates/progression-bar.html',
                scope: {
                  total: '@'
                },
                link: function(scope, elem, attrs){
                    attrs.$observe('progression', function(value){
                        var width =  (value * 260) / scope.total;
                        elem[0].children[0].style.width = width.toString() + 'px';
                    });
                }
            }

        }
    ]);
})(StageApp);