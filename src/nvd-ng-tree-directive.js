angular.module('CustomAngular')
    .directive('nvdNgTree', ['NvdNgTreeService', function (Tree) {
        return {
            restrict: 'E',
            template: '<div ng-include="getContentUrl()"></div>',
            scope: {
                tree: '=tree',
                templateUrl: '=templateUrl'
            },
            link: function (scope, elem, attrs) {
                scope.getContentUrl = function () {
                    var url = scope.templateUrl;
                    if (!url) {
                        url = getCurrentScript();
                        url = url.replace(/js$/, 'html');
                    }
                    return url;
                };
                var getCurrentScript = function () {
                    var script = $("script[src*='nvd-ng-tree']");
                    return script.get(0).src;
                };
            }
        };
    }]);