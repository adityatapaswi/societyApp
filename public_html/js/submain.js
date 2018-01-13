var recomSubApp = angular.module('app.recomsys.sub', ['app.recomsys']);

recomSubApp.controller('RightMenuController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.logout = function ()
    {
        $cookieStore.remove("recomApp");
        $location.path("/");
        $window.location.reload();
    };
});


recomSubApp.controller('PhotoGalleryController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.images = [
        {
            img: "http://demo.michaelsoriano.com/images/photodune-174908-rocking-the-night-away-xs.jpg",
            title: "Diwali Celebration In The Society",
            desc: 'Diwali Celebrated In Traditional And Colorful Avatar',
            date: "27 Nov 2017"

        },
        {
            img: "http://demo.michaelsoriano.com/images/photodune-287182-blah-blah-blah-yellow-road-sign-xs.jpg",
            title: "Diwali Celebration In The Society",
            desc: 'Diwali Celebrated In Traditional And Colorful Avatar',
            date: "27 Nov 2017"

        },
        {
            img: "http://demo.michaelsoriano.com/images/photodune-287182-blah-blah-blah-yellow-road-sign-xs.jpg",
            title: "Diwali Celebration In The Society",
            desc: 'Diwali Celebrated In Traditional And Colorful Avatar',
            date: "27 Nov 2017"

        },
        {
            img: "http://demo.michaelsoriano.com/images/photodune-460760-colors-xs.jpg",
            title: "Diwali Celebration In The Society",
            desc: 'Diwali Celebrated In Traditional And Colorful Avatar',
            date: "27 Nov 2017"

        },
        {
            img: "http://demo.michaelsoriano.com/images/photodune-460760-colors-xs.jpg",
            title: "Diwali Celebration In The Society",
            desc: 'Diwali Celebrated In Traditional And Colorful Avatar',
            date: "27 Nov 2017"

        },
        {
            img: "http://demo.michaelsoriano.com/images/photodune-461673-retro-party-xs.jpg",
            title: "Diwali Celebration In The Society",
            desc: 'Diwali Celebrated In Traditional And Colorful Avatar',
            date: "27 Nov 2017"

        }
    ];
    $scope.selectImage = function (img)
    {
        $scope.photo = img;
    };
    $scope.gotoAdd = function ()
    {
        $location.path('/addPhoto');
    };
});
recomSubApp.controller('ManageSocietyMembersController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.members = [
        {
            name: "Aditya Tapaswi",
            email: "adityatapaswi21@gmail.com",
            phone: '9021280829',
            address: "101"

        },
        {
            name: "Sanket Bade",
            email: "sanketbade@gmail.com",
            phone: '9021280828',
            address: "201"

        }, {
            name: "Jayesh Mali",
            email: "jayeshmali@gmail.com",
            phone: '9021280825',
            address: "203"

        },
        {
            name: "Sudhanshu Tapaswi",
            email: "sudhanshutapaswi@gmail.com",
            phone: '9021280827',
            address: "103"

        }
    ];
    $scope.gotoAdd = function ()
    {
        $location.path('/addSocietyMembers');
    };
});
recomSubApp.controller('BalanceSheetController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.transactions = [
        {
            tid: "003",
            desc: "Monthly Maintainance Deposit",
            type: "CR",
            by: "Aditya Tapaswi",
            amt: "1000",
            date: "23 Nov 2017"

        },
        {
            tid: "002",
            desc: "Monthly Janitor Salary",
            type: "DB",
            by: "ME",
            amt: "500",
            date: "22 Nov 2017"

        },
        {
            tid: "001",
            desc: "Water Bill",
            type: "DB",
            by: "ME",
            amt: "3000",
            date: "12 Nov 2017"

        }
    ];
    $scope.summary = [
        {
            title: "Balance",
            amt: "5000"

        },
        {
            title: "Expenditure",
            amt: "2000"

        },
        {
            title: "Total Deposit",
            amt: "7000"

        }

    ];
    $scope.gotoAdd = function ()
    {
        $location.path('/addTransaction');
    };
});
recomSubApp.controller('DiscussionController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.dicussionName = "Water Leakage";
    $scope.discussions = [
        {
            name: "Water Leakage",
            by: "Sanket Bade",
            on: "20 Nov 2017"

        },
        {
            name: "Shortage Of Parking",
            by: "Jayesh Mali",
            on: "12 Nov 2017"

        }, {
            name: "Salesman Problems",
            by: "Sudhanhu Tapaswi",
            on: "29 Oct 2017"

        }

    ];
    $scope.messages = [
        {
            msg: "Waterasd asda sda sd asd asd asd as dasd asd  Leakage",
            from: "Sanket Bade",
            on: "20 Nov 2017 2:00 pm"

        },
        {
            msg: "Watera sd asd as dasd as dasdasd asdas a Leakage",
            from: "Sanket Bade",
            on: "20 Nov 2017 2:01 pm"

        },
        {
            msg: "Ok\nGot It",
            from: "Aditya Tapaswi",
            on: "20 Nov 2017"

        }

    ];
    $scope.viewDiscussion = function ()
    {
        $location.path('/discussionRoom');
    };
    $scope.gotoAdd = function ()
    {
        $location.path('/openDiscussion');
    };
}
);
recomSubApp.controller('EventController', function ($scope, $location, $window, $filter, $cookieStore, $http, CONSTANTS) {
    $scope.minDate = $scope.dt = $filter('date')(new Date(), "yyyy-MM-dd");
    $scope.curDate = $scope.minDate;
    $scope.events = [
        {
            date: "Today",
            title: "Fancy Dress Competition"

        },
        {
            date: "25 Dec 2017",
            title: "Christmas Celebration"

        },
        {
            date: "31 Dec 2017",
            title: "New Year Celebration"

        }
    ];
    $scope.changeDate = function (date)
    {
        if (date >= new Date()) {
            var dateStr = date;
            $scope.dt = $filter('date')(dateStr, "dd MMM yyyy");
        }
        else
        {
            $scope.dt=null;
        }
    };
    $scope.gotoAdd = function ()
    {
        $location.path('/addEvent');
    };
});
recomSubApp.controller('BirthdayAnniversaryController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.birthdaysAndAnniversaries = [
        {
            eventType: "birthday",
            date: "Today",
            title: "Aditya Tapaswi"

        },
        {
            eventType: "birthday",
            date: "Today",
            title: "Sanket Bade"

        },
        {
            eventType: "anniversary",
            date: "26 Nov 2017",
            title: "Sudhanshu Tapaswi"

        }
    ];
});
recomSubApp.controller('DashboardController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.timeline = [
        {
            eventType: "News",
            date: "21 Dec 2017",
            title: "Started The Design Of Website",
            description: "Project is started taking toll and aggressively progressing towards completion",
            by: "Aditya Tapaswi"
        },
        {
            eventType: "News",
            date: "21 Dec 2017",
            title: "Started The Design Of Website",
            description: "Project is started taking toll and aggressively progressing towards completion",
            by: "Aditya Tapaswi"
        },
        {
            eventType: "News",
            date: "21 Dec 2017",
            title: "Started The Design Of Website",
            description: "Project is started taking toll and aggressively progressing towards completion",
            by: "Aditya Tapaswi"
        }
    ];

});
recomSubApp.controller('LoginController', function ($scope, $location, $window, $cookieStore, $http, CONSTANTS) {

    $scope.login = function () {
        //This authenticates user
        $authdata = utilities.Base64.encode("aditya.tapaswi@midasblue.com" + ':' + "Adtya123");
        $http.defaults.headers.common.Authorization = 'Basic ' + $authdata;

        //This is http request for geeting user object with API and user object as parameters
//        $http.get(CONSTANTS.SERVICES.USERS).success(function ($user) {

        //This sets cookies for application
        $cookieStore.put("recomApp", $authdata);

        //This adds user object in userService
//                userService.addUser($user);

        $scope.$emit('showUserName', {
            show: true
        });
        //set cookie expiry (works when page is refreshed by user)
        var now = new $window.Date(), //get the current date
                // this will set the expiration to 1 hour
                exp = new $window.Date(now.getDate() + 1);

        $cookieStore.put("recomApp", $authdata, {
            expires: exp
        });

        $location.path("/home/dashboard");

//            $scope.closeModal();

//        }).error(function (error) {
//            if (error !== undefined) {
//                if (error.message === 'HTTP 500 Internal Server Error')
//                {
//                    $scope.errorMessage = 'Username or Password Invalid ';
//                    alertify.logPosition("top center");
//                    alertify.error($scope.errorMessage);
//
//                } else {
//                    $scope.errorMessage = error.error || error.message;
//                    alertify.logPosition("top center");
//                    alertify.error($scope.errorMessage);
//                }
//            }
////            $location.path("/login");
//        });
    };

});
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
recomApp.service('userService', ['$cookieStore', function ($cookieStore) {
        var user = $cookieStore.get("recomApp");
        var addUser = function (newObj) {
            user = newObj;
            //$cookies.put("futuremaker", $user);
        };
        var getUser = function () {
            //$user = $cookies.get("futuremaker",$user);
            return user;
        };
        return {
            addUser: addUser,
            getUser: getUser
        };
    }]);
recomApp.constant('CONSTANTS', (function () {
    // Define your variable
    var CONSTANTS = {};
    var SERVICES = {
//        BASE_PATH: 'http://ec2-54-169-136-45.ap-southeast-1.compute.amazonaws.com/api/fm/v0/'
        BASE_PATH: 'http://ec2-52-77-243-65.ap-southeast-1.compute.amazonaws.com/api/fm/v0/'
//        BASE_PATH: 'http://192.168.1.115:8080/api/fm/v0/'
                // 'http://localhost:8080/api/fm/v0/' //'http://ec2-52-74-20-101.ap-southeast-1.compute.amazonaws.com/api/fm/v0/' 
    };
    SERVICES.USERS = SERVICES.BASE_PATH + 'users';

    CONSTANTS.SERVICES = SERVICES;
    // Use the variable in your constants
    return CONSTANTS;
})());
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