var recomApp = angular.module('app.recomsys', ['ngCookies', 'file-model','cp.ngConfirm' ,'ngResource', 'ngRoute', "ngTable", 'ngFileSaver', 'ngMessages', 'app.recomsys.sub', 'ngSanitize', 'selectize', '720kb.datepicker', 'ui.bootstrap', 'chart.js', 'ngAlertify', 'angular-thumbnails']);
recomApp.config(
        function ($compileProvider)
        {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|blob|chrome-extension):/);

            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        }
);
//This starts the application and event listeners are injected in it
recomApp.run(function ($rootScope, $route, $location, $cookieStore, $templateCache) {

    // Registers listener to watch route changes
    $rootScope.$on("$locationChangeStart", function () {

        //On refreshing page, keeps username of logged in user
        //On refreshing page, keeps username of logged in user
        if ($cookieStore.get("societyApp")) {
            $rootScope.$broadcast('showUserName', {
                show: true
            });
        }
        else
        {
            $rootScope.$broadcast('showUserName', {
                show: false
            });
        }

        var restrictedPage = $.inArray($location.path(), ['/home', '/login', '/signup', '/contactUs','/resetPass','/forgotPass']) === -1;

        if (restrictedPage && (!$cookieStore.get("societyApp")))
        {
            $location.path('/home');
        }
    });
});
//Define Routing for application,contollers associated to html forms and active tabs in navigation bar. This is application configuration
recomApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
                when('/#', {
                    templateUrl: 'templates/base.html',
                    activetab: 'Home'
                })
                .when('/home', {
                    templateUrl: 'templates/base.html',
                    activetab: 'Home'
                })
                .when('/login', {
                    templateUrl: 'templates/login.html',
                    activetab: 'Home'
                })
                .when('/signup', {
                    templateUrl: 'templates/signup.html',
                    activetab: 'Home'
                })
                .when('/change-password', {
                    templateUrl: 'templates/changePassword.html',
                    activetab: 'Home'
                })
                .when('/home/dashboard', {
                    templateUrl: 'templates/dashboard.html',
                    activetab: 'Home'
                })
                .when('/contactUs', {
                    templateUrl: 'templates/contactUs.html',
                    activetab: 'Home'
                })
                .when('/manageSocietyMembers', {
                    templateUrl: 'templates/manageSocietyMembers.html',
                    activetab: 'Home'
                })
                .when('/discussions', {
                    templateUrl: 'templates/discussions.html',
                    activetab: 'Home'
                })
                .when('/openDiscussion', {
                    templateUrl: 'templates/openDiscussion.html',
                    activetab: 'Home'
                })
                .when('/discussionRoom', {
                    templateUrl: 'templates/discussionRoom.html',
                    activetab: 'Home'
                })
                .when('/addSocietyMembers', {
                    templateUrl: 'templates/addSocietyMember.html',
                    activetab: 'Home'
                })
                .when('/balanceSheet', {
                    templateUrl: 'templates/balanceSheet.html',
                    activetab: 'Home'
                })
                .when('/photoGallery', {
                    templateUrl: 'templates/photoGallery.html',
                    activetab: 'Home'
                })
                .when('/addPhoto', {
                    templateUrl: 'templates/addPhoto.html',
                    activetab: 'Home'
                })
                .when('/addEvent', {
                    templateUrl: 'templates/addEvent.html',
                    activetab: 'Home'
                })
                .when('/makePayments', {
                    templateUrl: 'templates/makePayments.html',
                    activetab: 'Home'
                })
                .when('/resetPass', {
                    templateUrl: 'templates/resetPass.html',
                    activetab: 'Home'
                })
                .when('/forgotPass', {
                    templateUrl: 'templates/forgotPass.html',
                    activetab: 'Home'
                })
                .when('/setPaymentsConfiguraation', {
                    templateUrl: 'templates/paymentConfiguration.html',
                    activetab: 'Home'
                })
                .when('/paymentRedirect', {
                    templateUrl: 'templates/paymentRedirect.html',
                    activetab: 'Home'
                })
                .when('/addTransaction', {
                    templateUrl: 'templates/addTransaction.html',
                    activetab: 'Home'
                })
                .when('/addPost', {
                    templateUrl: 'templates/addWallPost.html',
                    activetab: 'Home'
                })
                .otherwise({
                    redirectTo: '/home'
                });

    }]);

//This is controller for navigation bar which defines logic for events on menu and submenu clicks
recomApp.controller('NavController', function ($scope, $location, $window, $cookieStore, $http) {

    $scope.states = {};
    $scope.states.activeMenuItem = 'home';
    $scope.menuItems = [{
            id: 'menuItem1',
            title: 'Home',
            template: '#/home',
            show: true
//            color:'#000'
        },
//        {
//            id: 'menuItem2',
//            title: 'Login',
//            template: '#/login',
////             color:'#000',
//            show: true
//        }, 
        {
            id: 'menuItem2',
            title: 'Signup',
            template: '#/signup',
            show: true
        },
        {
            id: 'menuItem3',
            title: 'Contact Us',
            template: '#/contactUs',
            show: true
        }
    ];
    $scope.$on('showUserName', function (event, args) {
        if (args.show) {
            $scope.user = args;
            $scope.menuItems[1].show = false;
            $scope.menuItems[0].show = false;
            $scope.menuItems[2].show = false;
        }
    });
}
);

recomApp.directive('loading', ['$http', function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };
                scope.$watch(scope.isLoading, function (v)
                {
                    if (v) {
                        elm.show();
                    } else {
                        elm.hide();
                    }
                });
            }
        };
    }]);

(function () {
    'use strict';
    // attach utilities as a property of window
    var utilities = window.utilities || (window.utilities = {});
    // BEGIN API
    function helloWorld() {
        alert('hello world!');
    }

    function utilityMethod1() {
        alert('Utility Method 1');
    }

    function utilityMethod2() {
        alert('Utility Method 2');
    }

    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
    };
    // END API

    // publish external API by extending myLibrary
    function publishExternalAPI(utilities) {
        angular.extend(utilities, {
            'Base64': Base64,
            'helloWorld': helloWorld,
            'utilityMethod1': utilityMethod1,
            'utilityMethod2': utilityMethod2
        });
    }

    publishExternalAPI(utilities);
})(window, document);
