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
        $scope.loading = true;
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

                    }
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();

                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
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
        $scope.loading = true;
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
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
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
        $scope.loading = true;
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
                    $scope.loading = false;
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
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
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
        $scope.loading = true;
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

                    }
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();

                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something Went Wrong");
                    }

                });
    };
});
recomSubApp.controller('UserController', function ($scope, objTransferService, alertify, $ngConfirm, $location, utilService, $window, $cookieStore, $http, CONSTANTS) {
    $scope.user = objTransferService.getObj();
    $scope.checkForUser = function () {
        if (!$scope.user.password)
            $location.path('/manageSocietyMembers');

    };
    $scope.getSearchParams = function () {
        $scope.reset = {};
        if ($location.$$search.id)
        {
            $scope.reset.id = $location.$$search.id;
//            $scope.reset.type = $location.$$search.type;
        }
    };
    $scope.changePass = function () {
        if ($scope.user.password === $scope.oldPass) {
            if ($scope.newPass === $scope.cPass) {
                $scope.loading = true;
                $.post(CONSTANTS.SERVICES.APIURL, {view: CONSTANTS.VIEW.CHANGEPASS, id: $scope.user.id, password: $scope.newPass})
                        .success(function (data) {
                            if (data.includes('Successfully')) {
                                alertify.logPosition("top center");
                                alertify.success(data);
                                $location.path('/manageSocietyMembers');
                            }
                            $scope.loading = false;
                            if (!$scope.$$phase)
                                $scope.$apply();
                        })
                        .error(function (xhr, status, error) {
                            $scope.loading = false;
                            if (!$scope.$$phase)
                                $scope.$apply();

                            if (error !== undefined) {
                                alertify.logPosition("top center");
                                alertify.error("Password Change Failed");
                            }

                        });
            }
            else {
                alertify.logPosition("top center");
                alertify.error("Password And Confirm Password Didn't Matched");
            }
        } else {
            alertify.logPosition("top center");
            alertify.error("Old Password Didn't Matched");
        }
    };
    $scope.resetPass = function () {
        if ($scope.reset.pass === $scope.reset.cPass) {
            $scope.loading = true;
            $.post(CONSTANTS.SERVICES.APIURL, {view: CONSTANTS.VIEW.CHANGEPASS, id: $scope.reset.id, password: $scope.reset.pass})
                    .success(function (data) {
                        if (data.includes('Successfully')) {
                            alertify.logPosition("top center");
                            alertify.success(data);
                            $location.path('/home');
                        }
                        $scope.loading = false;
                        if (!$scope.$$phase)
                            $scope.$apply();
                    })
                    .error(function (xhr, status, error) {
                        $scope.loading = false;
                        if (!$scope.$$phase)
                            $scope.$apply();
                        // error handling
                        if (error !== undefined) {
                            alertify.logPosition("top center");
                            alertify.error("Somthing Went Wrong");
                        }

                    });
        }
        else {
            alertify.logPosition("top center");
            alertify.error("Password And Confirm Password Didn't Matched");
        }

    };
    $scope.getUserId = function () {
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, {view: CONSTANTS.VIEW.GETUSERID, email: $scope.email})
                .success(function (data) {
                    if (data.id) {
                        $location.path('/forgotPass').search({id: data.id});
                    }
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Somthing Went Wrong");
                    }
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                });


    };
});
recomSubApp.controller('PhotoGalleryController', function ($scope, userService, alertify, $ngConfirm, $location, utilService, $window, $cookieStore, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.images = [];
    $scope.imgUrl = CONSTANTS.SERVICES.FILEPATH;
    $scope.deletePhoto = function ($img) {
        $ngConfirm({
            icon: 'fa fa-question',
            closeIcon: true,
            closeIconClass: 'fa fa-close',
            title: 'Confirm!',
            theme: 'supervan',
            type: "green",
            content: '<strong>Are You Sure?</strong> You Want To Delete This?',
            scope: $scope,
            buttons: {
                sayBoo: {
                    text: 'Yes',
                    btnClass: 'btn-danger',
                    action: function (scope, button) {
                        $scope.loading = true;
                        $img.view = CONSTANTS.VIEW.DELETEIMAGE;
                        $.post(CONSTANTS.SERVICES.APIURL, $img)
                                .success(function (data) {
                                    $scope.loading = true;
                                    if (data.includes('Successfully')) {
                                        alertify.logPosition("top center");
                                        alertify.success(data);
                                        $scope.getPhotos();
                                    }
                                    if (!$scope.$$phase)
                                        $scope.$apply();
                                })
                                .error(function (xhr, status, error) {
                                    if (!$scope.$$phase)
                                        $scope.$apply();
                                    // error handling
                                    if (error !== undefined) {
                                        alertify.logPosition("top center");
                                        alertify.error("Somthing Went Wrong");
                                    }

                                });
                    }
                },
                somethingElse: {
                    text: 'No',
                    btnClass: 'btn-primary',
                    action: function (scope, button) {

                    }
                }
            }
        });
    };
    $scope.getPhotos = function () {
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, {view: CONSTANTS.VIEW.PHOTOS, id: $scope.user.sid})
                .success(function (data) {
                    $scope.images = data;
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Nothing To Show");
                    }

                });
    };
    $scope.addPhoto = function () {
        $scope.loading = true;
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
            $scope.loading = false;
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
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
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
recomSubApp.controller('ManageSocietyMembersController', function ($scope, userService, $location, objTransferService, $cookieStore, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.members = [];
    $scope.resetPass = function (member)
    {
        objTransferService.setObj(member);
        $location.path('/change-password');
    }
    $scope.getMembers = function ()
    {
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETMEMBERS})
                .success(function (data) {
                    $scope.members = data;
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    if (error !== undefined) {
                        $scope.loading = false;
                        if (!$scope.$$phase)
                            $scope.$apply();
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
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETSUMMARY})
                .success(function (data) {
                    $scope.loading = false;
                    $scope.summary = data;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                $scope.loading = false;
                if (!$scope.$$phase)
                    $scope.$apply();
                alertify.logPosition("top center");
                alertify.error("Something went wrong");
            }
        });
    };
    $scope.addTransaction = function () {
        $scope.loading = true;
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
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                $scope.loading = false;
                if (!$scope.$$phase)
                    $scope.$apply();
                alertify.logPosition("top center");
                alertify.error("Something went wrong");
            }
        });
    };
    $scope.getTransactions = function () {
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETTRANSACTIONS})
                .success(function (data) {
                    $scope.transactions = data;
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).error(function (xhr, status, error) {
            // error handling
            if (error !== undefined) {
                $scope.loading = false;
                if (!$scope.$$phase)
                    $scope.$apply();
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
recomSubApp.controller('ContactUsController', function ($scope, alertify, userService, $location, $window, $cookieStore, $http, CONSTANTS) {
    $scope.sendMsg = function () {
        $scope.loading = true;
        $scope.msg.view = CONSTANTS.VIEW.CONTACTUS;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.msg)
                .success(function (data) {
                    if (data === 'Insertion Success')
                    {
                        alertify.logPosition("top center");
                        alertify.success("We have registered your feedback. Thank You!");
                    }
                    $location.path("/home");
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Please Try Again. We Need Your Valuable Feedback");
                    }

                });
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
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.payment)
                .success(function (data) {
                    $scope.reponse = JSON.parse(data);
                    objTransferService.setObjUsingCookie($scope.payment);
                    $window.location.href = $scope.reponse.payment_request.longurl;
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    // error handling
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something Went Wrong");
                    }

                });
    };
    $scope.getConfig = function () {
        $scope.payment.id = $scope.user.sid;
        $scope.payment.view = CONSTANTS.VIEW.GETPAYMENTCONFIGURATION;
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.payment)
                .success(function (data) {
                    $scope.payment = data;
                    $scope.loading = false;
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
                        $scope.loading = false;
                        if (!$scope.$$phase)
                            $scope.$apply();
                    }

                });
    };
    $scope.configure = function () {
        $scope.payment.sid = $scope.user.sid;
        $scope.payment.view = CONSTANTS.VIEW.SETPAYMENTCONFIGURATION;
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.payment)
                .success(function (data) {
                    if (data.includes('Successfully'))
                        $location.path('/makePayments');
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {

                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Payment Not Configured");
                        $scope.gotoSetPayConfig();

                    }
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();

                });
    };
    $scope.gotoSetPayConfig = function ()
    {
        objTransferService.setObj($scope.payment);
        $location.path('/setPaymentsConfiguraation');
    };
});
recomSubApp.controller('DiscussionController', function ($scope, $location, objTransferService, userService, utilService, $http, CONSTANTS) {
    $scope.user = userService.getUser();
    $scope.pagination = {
        limit: 5,
        offset: 0
    };
    $scope.dicussionName = "Water Leakage";
    $scope.discussions = [
    ];
    $scope.messages = [];
    $scope.formatDate = function (dateStr) {
        if (utilService.datediff(dateStr) < 1)
            return "Today";
        else if (utilService.datediff(dateStr) < 2)
            return "Yesterday";
        else
            return utilService.formatChatDate(new Date(dateStr));
    };
    $scope.gotoDisscussions= function () {
      $location.path('/discussions')  
    };
    $scope.getOlderMessage = function () {
        $scope.getMessages();
    };
    $scope.getMessages = function () {
        if (!$scope.discussion) {
            $scope.discussion = objTransferService.getObj();
        }
        if ($scope.discussion.id) {
            $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.discussion.id, limit: $scope.messages.length + 5, offset: 0, view: CONSTANTS.VIEW.GETMESSAGE})
                    .success(function (data) {
                        $scope.messages = data;
                        if ($scope.last_msg !== $scope.messages[0].id) {
                            $scope.last_msg = $scope.messages[0].id;
                            $scope.scroll = true;
                        }
                        else {
                            $scope.scroll = false;
                        }
                        if (!$scope.$$phase)
                            $scope.$apply();
                    })
                    .error(function (xhr, status, error) {
                        // error handling
                        if (error !== undefined) {
                            alertify.logPosition("top center");
                            alertify.error("No More Messages");
                        }

                    });
        }
        else
            $location.path('/discussions');
        $scope.setIntervalForMessage();
    };
    $scope.setIntervalForMessage = function () {
        $scope.interval = setInterval(function () {
            if ($location.$$path === '/discussionRoom') {
                $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.discussion.id, limit: $scope.messages.length, offset: 0, view: CONSTANTS.VIEW.GETMESSAGE})
                        .success(function (data) {
//                            console.log('Got New Messages');
                            $scope.messages = data;
                            $scope.scroll = false;
                            if ($scope.last_msg !== $scope.messages[0].id)
                            {
                                $scope.last_msg = $scope.messages[0].id;
                                $scope.scroll = true;
                            }
                            if (!$scope.$$phase)
                                $scope.$apply();
                        })
                        .error(function (xhr, status, error) {
                            // error handling
                            if (error !== undefined) {
//                                alertify.logPosition("top center");
//                                alertify.error("No More Messages");
                            }

                        });
            }
            else
                clearInterval($scope.interval);
        }, 3000);
    };
    $scope.addMessage = function () {
        $.post(CONSTANTS.SERVICES.APIURL, {did: $scope.discussion.id, by_id: $scope.user.id, msg: $scope.msg, view: CONSTANTS.VIEW.ADDMESSAGE})
                .success(function (data) {
                    if (data.includes('Success')) {
                        $scope.pagination = {
                            limit: 5,
                            offset: 0
                        };
                        $scope.messages = [];
                        $scope.msg = "";
                        $scope.getMessages();
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
    $scope.getDisscussion = function () {
        $scope.loading = true;
        $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETDISCUSSIONS})
                .success(function (data) {
                    $scope.discussions = data;
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something went wrong");
                    }

                });
    };
    $scope.formatTime = function (time)
    {
        return utilService.formatTime(new Date(time));
    };
    $scope.addDisscussion = function () {
        $scope.discussion.by = $scope.user.id;
        $scope.discussion.sid = $scope.user.sid;
        $scope.discussion.view = CONSTANTS.VIEW.ADDDISCUSSION;
        $scope.loading = true;
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
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Something went wrong");
                    }

                });
    };
    $scope.viewDiscussion = function (disc)
    {
        objTransferService.setObj(disc);
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
    $scope.loading = true;
    $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.GETEVENTS})
            .success(function (data) {
                $scope.events = data;
                $scope.loading = false;
                if (!$scope.$$phase)
                    $scope.$apply();
            })
            .error(function (xhr, status, error) {
                $scope.loading = false;
                if (!$scope.$$phase)
                    $scope.$apply();
                // error handling
                if (error !== undefined) {
                    alertify.logPosition("top center");
//            alertify.error("Something went wrong");


                }

            });
    $scope.formatDate = function (dateStr) {
        var datediff = utilService.datediffGreater(dateStr);
        if (datediff === 0)
            return "Today";
        else if (datediff === 1)
            return "Tommorow";
        else
            return utilService.formatChatDate(new Date(dateStr));
    };
    $scope.selectEvent = function (event) {
        $scope.event = event;
    };
    $scope.createEvent = function () {
        $scope.loading = true;
        $scope.event.sid = $scope.user.sid;
        $scope.event.date_date = utilService.formatDate_Date($scope.dt);
        $scope.event.date = utilService.formatDate($scope.dt);
        $scope.event.time = utilService.formatTime($scope.time);
        $scope.event.view = CONSTANTS.VIEW.ADDEVENT;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.event)
                .success(function (data) {
                    $scope.loading = false;
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
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
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
    $scope.loading = true;
    $.post(CONSTANTS.SERVICES.APIURL, {id: $scope.user.sid, view: CONSTANTS.VIEW.BNA})
            .success(function (data) {
                $scope.birthdaysAndAnniversaries = data;
                $scope.loading = false;
                if (!$scope.$$phase)
                    $scope.$apply();
            })
            .error(function (xhr, status, error) {
                // error handling
                $scope.loading = false;
                if (!$scope.$$phase)
                    $scope.$apply();
                console.log(error);
            });
});
recomSubApp.controller('DashboardController', function ($scope, $location, userService, alertify, $http, CONSTANTS) {
    $scope.timeline = [];
    $scope.user = userService.getUser();
    $scope.req = {};
    $scope.getPosts = function () {
        $scope.loading = true;
        $scope.req.view = CONSTANTS.VIEW.GETWALL;
        $scope.req.id = $scope.user.sid;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.req)
                .success(function (data) {
                    $scope.timeline = data;
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                })
                .error(function (xhr, status, error) {
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Nothing to show");
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
    $scope.loading = false;
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
        $scope.loading = true;
        //This authenticates user
        $scope.user.view = CONSTANTS.VIEW.LOGIN;
        $.post(CONSTANTS.SERVICES.APIURL, $scope.user)
                .success(function (data) {
                    $scope.loading = false;

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
                    $scope.loading = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    // error handling
                    if (error !== undefined) {
                        alertify.logPosition("top center");
                        alertify.error("Credentials Not Valid");
                    }

                });
    };
});
recomSubApp.directive('scrollIf', function () {
    return function (scope, element, attributes) {
        setTimeout(function () {
            if (scope.$eval(attributes.scroll))
                if (scope.$eval(attributes.scrollIf)) {
                    window.scrollTo(0, element[0].offsetTop - 100)
                }
        });
    }
});
recomApp.directive('loading', ['$', function ($)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $.pendingRequests.length > 0;
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
recomApp.directive('loadingTwo', [function ()
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return scope.$eval(attrs.isLoading);
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
        var datediff = function (date) {
            var d1 = new Date(date);
            var d2 = new Date();
            var timeDiff = d2.getTime() - d1.getTime();
            var DaysDiff = timeDiff / (1000 * 3600 * 24);
            if (DaysDiff < 2)
                DaysDiff = d2.getDate() - d1.getDate();
            return DaysDiff;
        }
        var datediffGreater = function (date) {
            var d1 = new Date(date);
            var d2 = new Date();
            var timeDiff = d1.getTime() - d2.getTime();
            var DaysDiff = timeDiff / (1000 * 3600 * 24);
            if (DaysDiff < 2)
                DaysDiff = d1.getDate() - d2.getDate();
            return DaysDiff;
        }
        var formatChatDate = function (date) {
            return  $filter('date')(date, "dd MMM");
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
            formatTime: formatTime,
            formatChatDate: formatChatDate,
            datediff: datediff,
            datediffGreater: datediffGreater
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
recomSubApp.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
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
        APIURL: 'http://society-app.thesolutioncircle.in/api/ServiceController.php',
//        APIURL: 'http://localhost/society_api/ServiceController.php',
        FILEPATH: 'http://society-app.thesolutioncircle.in/api',
//        FILEPATH: 'http://localhost/society_api',
        UPLOADURL: 'http://society-app.thesolutioncircle.in/api/fileUpload.php'
//        UPLOADURL: 'http://localhost/society_api/fileUpload.php'
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
        SETPAYMENTCONFIGURATION: 'set payment configuration',
        ADDMESSAGE: 'add message to discussion',
        GETMESSAGE: 'get messages',
        DELETEIMAGE: 'delete image',
        CHANGEPASS: 'change password',
        GETUSERID: 'get user id',
        CONTACTUS: 'contact us'
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