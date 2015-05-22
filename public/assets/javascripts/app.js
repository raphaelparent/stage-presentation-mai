StageApp = angular.module('StageApp', ['ngAnimate']);

(function(StageApp){
    'use strict';
    StageApp.config(function( $controllerProvider ){

        // Set Controller Register helper
        // ================================================
        StageApp.controller = $controllerProvider.register;

    });

})(StageApp);
(function(StageApp){

    StageApp.controller('SliderController', ['$scope', '$timeout', '$document',
        function SliderCtrl($scope, $timeout, $document){

            // "Private" var
            // ----------------------------------------------------
            var opened = false;

            // Exposed var
            // ----------------------------------------------------
            $scope.model           = {};
            $scope.model.showed    = 1;
            $scope.model.min       = 1;
            $scope.model.max       = 16;
            $scope.model.direction = 'right';
            $scope.model.menuClass = 'closed';

            $scope.model.presentationTitle = "Stage \n @Nurun";
            $scope.model.slides = [
                { name: 'accueil',                   index: 1},
                { name: 'mtl-dashboard-analytics',   index: 2},
                { name: 'les étapes de productions', index: 3},
                { name: 'le côté administrateur',    index: 4},
                { name: 'le côté client',            index: 5},
                { name: 'la recherche',              index: 6},
                { name: 'la stack technologique',    index: 8},
                { name: 'les différences',           index: 13},
                { name: 'les compétences',           index: 14},
                { name: 'les points marquants',      index: 15},
                { name: 'la partie intéressante',    index: 16}
            ];

            // Go to next slide.
            // ----------------------------------------------------
            $scope.model.next = function(){
                $scope.model.direction = 'right';

                //Timeout to let the class be applied before running the animation
                $timeout(function(){
                    if($scope.model.showed < $scope.model.max)
                        $scope.model.showed++;
                    else
                        $scope.model.showed = $scope.model.min;

                }, 10);

            };

            // Go to previous slide.
            // ----------------------------------------------------
            $scope.model.prev = function(){
                $scope.model.direction = 'left';

                // Timeout to let the class be applied before running the animation
                $timeout(function(){
                    if($scope.model.showed > $scope.model.min)
                        $scope.model.showed--;
                    else
                        $scope.model.showed = $scope.model.max;
                }, 10);

            };

            // Change index based on element clicked in nav.
            // ----------------------------------------------------
            $scope.model.change = function(pIndex){
                if(pIndex > $scope.model.showed)
                    $scope.model.direction = 'right';
                else
                    $scope.model.direction = 'left';

                $timeout(function(){
                    $scope.model.showed = pIndex;
                    $scope.$apply($scope.model.toggleMenu());
                }, 10);
            };

            // Toggle class for open/closed menu.
            // ----------------------------------------------------
            $scope.model.toggleMenu = function(){
                opened = !opened;
                if(opened === false)
                    $scope.model.menuClass = 'closed';
                else
                    $scope.model.menuClass = 'opened';
            };

            // Bind function to key for better presentation.
            // ----------------------------------------------------
            $document.bind('keypress', function(e){
                //console.log(e.charCode);
                switch(e.charCode){
                    // Key is "K"
                    case 107:
                        $scope.$apply($scope.model.prev());
                        break;
                    // Key is "L"
                    case 108:
                        $scope.$apply($scope.model.next());
                        break;
                    // Key is "O"
                    case 111:
                        $scope.$apply($scope.model.toggleMenu());
                        break;
                }
            });

        }
    ])

}(StageApp));

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