var recomSubApp = angular.module('app.recomsys.sub', ['app.recomsys']);

recomSubApp.controller('RightMenuController', function ($scope, userService, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.logout = function ()
    {
        $cookieStore.remove("societyApp");
        $location.path("/");
        $window.location.reload();
    };
});


recomSubApp.controller('PostWallController', function ($scope, userService, alertify, utilService, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.types = ["News", "Notice"];
    $scope.user = userService.getUser();
    $scope.addPost = function () {
        $scope.post.date = utilService.formatDate(new Date());
        $scope.post.view = CONSTANTS.VIEW.CREATEPOST;
        $scope.post.date_date = utilService.formatDate_Date(new Date());
        $scope.post.sid = $scope.user.sid;
        $scope.post.by = $scope.user.id;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.post)
                .success(function (data) {
                    if (!data.reply)
                    {
                        alertify.logPosition("top center");
                        alertify.error(data);

                    } else
                    {
                        alertify.logPosition("top center");
                        alertify.success(data.reply);
                        $location.path('/home/dashboard');
                        if (!$scope.$$phase)
                            $scope.$apply();
                    }


                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something Went Wrong");


                    }

                });


    };
});
recomSubApp.controller('RedirectController', function ($scope, alertify, $location, utilService, userService, objTransferService, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.payment = objTransferService.getObjUsingCookie();
    $scope.trans = {};
    if ($scope.payment && $scope.payment.amount && $location.$$search.payment_id)
    {
        $scope.trans.date = utilService.formatDate(new Date());
        $scope.trans.date_date = utilService.formatDate_Date(new Date());
        $scope.trans.sid = $scope.user.sid;
        $scope.trans.desc = $scope.payment.purpose;
        $scope.trans.amt = $scope.payment.amount;
        $scope.trans.by = $scope.user.id;
        $scope.trans.view = CONSTANTS.VIEW.ADDTRANSACTION;
        $scope.trans.type = "CR";
        $.post(CONSTANTS.SERVICES.APIURL, $scope.trans)
                .success(function (data) {
                    if (data.reply.includes('Successfully'))
                    {
                        alertify.logPosition("top center");
                        alertify.success(data.reply);
                        $location.path('/balanceSheet');
                    }
                    else
                    {
                        alertify.logPosition("top center");
                        alertify.error(data.reply);
                    }
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                alertify.logPosition("top center");
                alertify.error("Something went wrong");
            }
        });
    }
});
recomSubApp.controller('AddSocietyMemberController', function ($scope, userService, alertify, utilService, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.u = userService.getUser();
    $scope.addMember = function () {
        $scope.user.view = CONSTANTS.VIEW.SIGNUP;
        $scope.user.dob = utilService.formatDate($scope.dob);
        $scope.user.dob_date = utilService.formatDate_Date($scope.dob);
        if ($scope.doa) {
            $scope.user.doa = utilService.formatDate($scope.doa);
            $scope.user.doa_date = utilService.formatDate_Date($scope.doa);

        }
        $scope.user.type = 'member';
        $scope.user.sid = $scope.u.sid;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.user)
                .success(function (data) {
                    if (!data.reply)
                    {
                        alertify.logPosition("top center");
                        alertify.error(data);

                    } else
                    {
                        alertify.logPosition("top center");
                        alertify.success(data.reply);
                        $location.path('/home/dashboard');
                        if (!$scope.$$phase)
                            $scope.$apply();
                    }


                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something Went Wrong");


                    }

                });

    };
});
recomSubApp.controller('SignupController', function ($scope, alertify, utilService, $location, $window, $cookieStore, $http, CONSTANTS) {

    $scope.signup = function () {
        $scope.user.view = CONSTANTS.VIEW.SIGNUP;
        $scope.user.dob = utilService.formatDate($scope.dob);
        $scope.user.dob_date = utilService.formatDate_Date($scope.dob);
        if ($scope.doa) {
            $scope.user.doa = utilService.formatDate($scope.doa);
            $scope.user.doa_date = utilService.formatDate_Date($scope.doa);

        }
        $scope.user.type = 'society';
        $.post(CONSTANTS.SERVICES.APIURL, $scope.user)
                .success(function (data) {
                    if (!data.reply)
                    {
                        alertify.logPosition("top center");
                        alertify.error(data);

                    } else
                    {
                        alertify.logPosition("top center");
                        alertify.success(data.reply);
                        $location.path('/');
                        if (!$scope.$$phase)
                            $scope.$apply();
                    }


                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something Went Wrong");


                    }

                });

    };
});
recomSubApp.controller('PhotoGalleryController', function ($scope, userService, alertify, $location, utilService, $window, $cookieStore, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.images = [];
    $scope.imgUrl = CONSTANTS.SERVICES.FILEPATH;
    $scope.getPhotos = function () {
        $.post(CONSTANTS.SERVICES.APIURL, {view: CONSTANTS.VIEW.PHOTOS, id: $scope.user.sid})
                .success(function (data) {
                    $scope.images = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Credentials Not Valid");


                    }

                });
    };
    $scope.addPhoto = function () {
        $scope.photo.date = utilService.formatDate(new Date());
//      $scope.photo.upfile=$scope.upfile;
        $scope.photo.date_date = utilService.formatDate_Date(new Date());
        $scope.photo.sid = $scope.user.sid;
        $scope.photo.by = $scope.user.id;
        var form_data = new FormData();
        for (var key in $scope.photo) {
            form_data.append(key, $scope.photo[key]);
        }
        $.ajax({
            url: CONSTANTS.SERVICES.UPLOADURL,
            data: form_data,
            processData: false,
            contentType: false,
            type: 'POST'}).success(function (data) {
            if (data.reply)
            {
                alertify.logPosition("top center");
                alertify.success(data.reply);
                $location.path('/photoGallery');
            }
            else
            {
                alertify.logPosition("top center");
                alertify.error(data.error);
            }
            if (!$scope.$$phase)
                $scope.$apply();
        })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something Went Wrong");


                    }

                });
    };
    $scope.selectImage = function (img)
    {
        $scope.photo = img;
    };
    $scope.gotoAdd = function ()
    {
        $location.path('/addPhoto');
    };
});
recomSubApp.controller('ManageSocietyMembersController', function ($scope, userService, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.members = [];
    $scope.getMembers = function ()
    {
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETMEMBERS})
                .success(function (data) {
                    $scope.members = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                alertify.logPosition("top center");
                alertify.error("Something went wrong");
            }
        });
    };
    $scope.gotoAdd = function ()
    {
        $location.path('/addSocietyMembers');
    };
});
recomSubApp.controller('BalanceSheetController', function ($scope, userService, utilService, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.transactions = [];
    $scope.summary = [];
    $scope.getSummary = function () {
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETSUMMARY})
                .success(function (data) {
                    $scope.summary = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                alertify.logPosition("top center");
                alertify.error("Something went wrong");
            }
        });
    };

    $scope.addTransaction = function () {
        $scope.trans.date = utilService.formatDate($scope.date);
        $scope.trans.date_date = utilService.formatDate_Date($scope.date);
        $scope.trans.sid = $scope.user.sid;
        $scope.trans.by = $scope.user.id;
        $scope.trans.view = CONSTANTS.VIEW.ADDTRANSACTION;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.trans)
                .success(function (data) {
                    if (data.reply.includes('Successfully'))
                    {
                        alertify.logPosition("top center");
                        alertify.success(data.reply);
                        $location.path('/balanceSheet');
                    }
                    else
                    {
                        alertify.logPosition("top center");
                        alertify.error(data.reply);
                    }
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                alertify.logPosition("top center");
                alertify.error("Something went wrong");
            }
        });
    };

    $scope.getTransactions = function () {
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETTRANSACTIONS})
                .success(function (data) {
                    $scope.transactions = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                alertify.logPosition("top center");
                alertify.error("Something went wrong");
            }
        });
        $scope.getSummary();
    };
    $scope.gotoAdd = function ()
    {
        $location.path('/addTransaction');
    };
});
recomSubApp.controller('PaymentsController', function ($scope, $location, userService, $window, objTransferService, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.payment = objTransferService.getObj() || {};
    $scope.response;
    if ($scope.payment && $scope.payment.monthly_maintainance) {
        $scope.payment.monthly_maintainance = parseInt($scope.payment.monthly_maintainance);
    }
    $scope.payRequest = function () {
        $scope.payment.phone = $scope.user.phone;
        $scope.payment.email = $scope.user.email;
        $scope.payment.name = $scope.user.name;
        $scope.payment.view = CONSTANTS.VIEW.MAKEPAYMENT;

        if ($scope.paymentType === 'mm')
        {
            $scope.payment.amount = $scope.payment.monthly_maintainance;
            $scope.payment.purpose = "Monthly Maintenance";

        }
        $.post(CONSTANTS.SERVICES.APIURL, $scope.payment)
                .success(function (data) {
                    $scope.reponse = JSON.parse(data);
                    objTransferService.setObjUsingCookie($scope.payment);
                    $window.location.href = $scope.reponse.payment_request.longurl;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something Went Wrong");


                    }

                });

    };
    $scope.getConfig = function () {
        $scope.payment.id = $scope.user.sid;
        $scope.payment.view = CONSTANTS.VIEW.GETPAYMENTCONFIGURATION;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.payment)
                .success(function (data) {
                    $scope.payment = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Payment Not Configured");
                        if ($scope.user.type === 'chairman')
                            $scope.gotoSetPayConfig();
                        else
                        {
                            alertify.logPosition("top center");
                            alertify.error("Please Inform Your Chairman To Enable Online Payment");
                            $location.path('/home/dashboard');
                        }

                        if (!$scope.$$phase)
                            $scope.$apply();

                    }

                });

    };
    $scope.configure = function () {
        $scope.payment.sid = $scope.user.sid;
        $scope.payment.view = CONSTANTS.VIEW.SETPAYMENTCONFIGURATION;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.payment)
                .success(function (data) {
                    if (data.includes('Successfully'))
                        $location.path('/makePayments');
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Payment Not Configured");
                        $scope.gotoSetPayConfig();
                        if (!$scope.$$phase)
                            $scope.$apply();

                    }

                });

    };
    $scope.gotoSetPayConfig = function ()
    {
        objTransferService.setObj($scope.payment);
        $location.path('/setPaymentsConfiguraation');
    };
});
recomSubApp.controller('DiscussionController', function ($scope, $location, userService, utilService, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.dicussionName = "Water Leakage";
    $scope.discussions = [
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
    $scope.formatDate = function (dateStr) {
        return utilService.formatDate(new Date(dateStr));
    };
    $scope.getDisscussion = function () {
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETDISCUSSIONS})
                .success(function (data) {
                    $scope.discussions = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something went wrong");


                    }

                });

    };
    $scope.addDisscussion = function () {
        $scope.discussion.by = $scope.user.id;
        $scope.discussion.sid = $scope.user.sid;
        $scope.discussion.view = CONSTANTS.VIEW.ADDDISCUSSION;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.discussion)
                .success(function (data) {
                    if (data.reply) {
                        if (data.reply.includes('Successfully'))
                        {
                            alertify.logPosition("top center");
                            alertify.success(data.reply);
                            $location.path('/discussions');

                        }
                        else
                        {
                            alertify.logPosition("top center");
                            alertify.error(data.reply);

                        }
                    }
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something went wrong");


                    }

                });

    };
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
recomSubApp.controller('EventController', function ($scope, userService, alertify, utilService, $location, $window, $filter, $cookieStore, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.minDate = $filter('date')(new Date(), "yyyy-MM-dd");
    $scope.events = [];
    $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETEVENTS})
            .success(function (data) {
                $scope.events = data;
                if (!$scope.$$phase)
                    $scope.$apply();
            }).error(function (xhr, status, error) {
        // error handling
        if (error !== undefined) {
            alertify.logPosition("top center");
            alertify.error("Something went wrong");


        }

    });

    $scope.createEvent = function () {
        $scope.event.sid = $scope.user.sid;
        $scope.event.date_date = utilService.formatDate_Date($scope.dt);
        $scope.event.date = utilService.formatDate($scope.dt);
        $scope.event.time = utilService.formatTime($scope.time);
        $scope.event.view = CONSTANTS.VIEW.ADDEVENT;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.event)
                .success(function (data) {
                    if (data.reply) {
                        if (data.reply.includes('Succesfully'))
                        {
                            alertify.logPosition("top center");
                            alertify.success(data.reply);
                            $location.path('/home/dashboard')

                        }
                        else
                        {
                            alertify.logPosition("top center");
                            alertify.error(data.reply);

                        }
                    }
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something went wrong");


                    }

                });
    };
    $scope.gotoAdd = function ()
    {
        $location.path('/addEvent');
    };
});
recomSubApp.controller('BirthdayAnniversaryController', function ($scope, userService, $window, $cookieStore, $http, CONSTANTS) {
    $scope.birthdaysAndAnniversaries = [];
    $scope.user = userService.getUser();
    $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.BNA})
            .success(function (data) {
                $scope.birthdaysAndAnniversaries = data;
                if (!$scope.$$phase)
                    $scope.$apply();
            }).error(function (xhr, status, error) {
        // error handling
        console.log(error);

    });
});
recomSubApp.controller('DashboardController', function ($scope, $location, userService, alertify, $http, CONSTANTS) {
    $scope.timeline = [];
    $scope.user = userService.getUser();
    $scope.req = {};
    $scope.getPosts = function () {
        $scope.req.view = CONSTANTS.VIEW.GETWALL;
        $scope.req.id = $scope.user.sid;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.req)
                .success(function (data) {
                    $scope.timeline = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something went wrong");


                    }

                });
    };
    $scope.gotoAdd = function () {
        $location.path("/addPost");
    };


});
recomSubApp.controller('LoginController', function ($scope, userService, alertify, $location, $window, $cookieStore, $http, CONSTANTS) {
    if (userService.getUser() !== undefined)
        $location.path('/home/dashboard');
    $scope.showHidePassword = 'password';
    $scope.togglePassword = function () {
        switch ($scope.showPassword)
        {
            case true:
                $scope.showHidePassword = 'text';
                break;
            case false:
                $scope.showHidePassword = 'password';
                break;
            default :
                $scope.showHidePassword = 'password';
        }
    };
    $scope.user = {};
    $scope.login = function () {
        //This authenticates user
        $scope.user.view = CONSTANTS.VIEW.LOGIN;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.user)
                .success(function (data) {
                    //This sets cookies for application
                    $cookieStore.put("societyApp", data);

                    //This adds user object in userService
//                userService.addUser($user);

                    //set cookie expiry (works when page is refreshed by user)
                    var now = new $window.Date(), //get the current date
                            // this will set the expiration to 1 hour
                            exp = new $window.Date(now.getDate() + 1);

                    $cookieStore.put("societyApp", data, {
                        expires: exp
                    });

                    $location.path("/home/dashboard");
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Credentials Not Valid");


                    }

                });
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
        var user;
        var addUser = function (newObj) {
            user = newObj;
            //$cookies.put("futuremaker", $user);
        };
        var getUser = function () {
            user = $cookieStore.get("societyApp");
            return user;
        };
        return {
            addUser: addUser,
            getUser: getUser
        };
    }]);
recomApp.service('utilService', ['$filter', function ($filter) {
        var formatDate = function (date) {
            return  $filter('date')(date, "dd MMM yyyy");
        };
        var formatDate_Date = function (date) {
            return  $filter('date')(date, "yyyy-MM-dd");
        };
        var formatTime = function (date) {
            return  $filter('date')(date, "hh:mm a");
        };

        return {
            formatDate_Date: formatDate_Date,
            formatDate: formatDate,
            formatTime: formatTime
        };
    }]);
recomApp.service('objTransferService', function ($cookieStore) {
    var obj = {};
    var setObj = function (newObj) {
        obj = newObj;
        //$cookies.put("futuremaker", $user);
    };
    var setObjUsingCookie = function (newObj) {

        $cookieStore.put("object", newObj);
    };
    var getObj = function () {
        //$user = $cookies.get("futuremaker",$user);
        return obj;
    };
    var getObjUsingCookie = function () {
        //$user = $cookies.get("futuremaker",$user);
        return $cookieStore.get("object");
    };
    return {
        setObj: setObj,
        setObjUsingCookie: setObjUsingCookie,
        getObjUsingCookie: getObjUsingCookie,
        getObj: getObj
    };
});
recomSubApp.filter('titlecase', function () {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                    match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                    (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                    title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    }
});
recomApp.constant('CONSTANTS', (function () {
    // Define your variable
    var CONSTANTS = {};
    var SERVICES = {
//         APIURL: 'http://ec2-54-169-136-45.ap-southeast-1.compute.amazonaws.com/api/fm/v0/users'
//        APIURL: 'http://career.navigator.thesolutioncircle.in/ServiceController.php'
        APIURL: 'http://localhost/society_api/ServiceController.php',
        FILEPATH: 'http://localhost/society_api',
        UPLOADURL: 'http://localhost/society_api/fileUpload.php'
//        BASE_PATH: 'http://192.168.1.115:8080/api/fm/v0/'
                // 'http://localhost:8080/api/fm/v0/' //'http://ec2-52-74-20-101.ap-southeast-1.compute.amazonaws.com/api/fm/v0/' 
    };
    var VIEWS = {
        LOGIN: 'login',
        PHOTOS: 'get photos',
        SIGNUP: 'signup',
        CREATEPOST: 'create wall post',
        GETWALL: 'get wall',
        ADDEVENT: 'add event',
        GETEVENTS: 'get events',
        BNA: 'get bna',
        GETTRANSACTIONS: 'get transactions',
        ADDTRANSACTION: 'add transactions',
        GETSUMMARY: 'get summary',
        GETMEMBERS: 'get members',
        ADDDISCUSSION: 'create discussion',
        GETDISCUSSIONS: 'get discussions',
        MAKEPAYMENT: 'make payment',
        GETPAYMENTCONFIGURATION: 'get payment configuration',
        SETPAYMENTCONFIGURATION: 'set payment configuration'
    };

    CONSTANTS.SERVICES = SERVICES;
    CONSTANTS.VIEW = VIEWS;
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