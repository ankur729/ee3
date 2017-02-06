app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/menu.json').then(function (response) {
        $scope.menu = response.data;
    });

    $scope.ask_user_type_show = false;
    $scope.ask_user_type = function () {
        $scope.ask_user_type_show = !$scope.ask_user_type_show;
    }

    //  $scope.stylesheets = [
    //       {href: '../../css/reset.css', type:'text/css'},
    //       {href: '../../css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/reset.css', type:'text/css'},
    //       {href: '../../pages/admin/css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/media.css', type:'text/css'},
    //       {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},
          
          
    //     ];

        $scope.scripts = [
        
          {href: '../../pages/admin/js/fm.parallaxator.jquery.js', type:'text/javascript'},
          {href: '../../pages/admin/js/global.js', type:'text/javascript'},
          {href: '../../pages/admin/js/min.js', type:'text/javascript'},
          
          
        ];

        
}]);

app.controller('home_controller', ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {
 
 $rootScope.stylesheets ="";   //load according to page rendering ..
 
 $rootScope.stylesheets = [
          {href: '../../public/css/reset.css', type:'text/css'},
           {href: '../../public/css/style.css', type:'text/css'},
           
        ];

 
//DATA FOR FOOTER LINKS

$scope.social_info_details={};
$scope.social_after_get={};
$scope.getSocialInfos=function(){

  $http({
            method: "GET",
            url: "admin/get-social-infos"
        }).then(function mySucces(response) {

            $scope.social_after_get=response.data;
            console.log(response.data);
        }, function myError(response) {

        });

}

}]);

app.controller('cook_controller', ['$scope', '$http', function ($scope, $http) {

    $scope.food_details = {};
    $scope.occassions = ['Breakfast', 'Lunch', 'Brunch', 'Dinner'];
    $scope.deliveryRange = ['within 1 km', 'Within 2km'];


    // selected fruits
    $scope.selection = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(val) {
        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(val);
            console.log($scope.selection);
            $scope.food_details.occassion_list = $scope.selection;
        }
    }


    $scope.test = function () {

        $http({
            method: "GET",
            url: "foods/food-details"
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

    $scope.save = function () {

        $http({
            method: "POST",
            url: "foods/food-details"
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

    $scope.save_food_details = function (save_food_details) {

        console.log(save_food_details);
    }
}]);


app.controller('product', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/products.json').then(function (response) {
        $scope.products = response.data;
    });
}]);


app.controller('user_info', ['$scope', '$http', function ($scope, $http) {

    $scope.user_details={};
    
   

    $scope.add_user_info = function (user_info) {

        
        $http({
            method: "POST",
            url: "user/add-user-info",
            data:user_info
        }).then(function mySucces(response) {

            console.log(response);
        }, function myError(response) {

        });


    }

}]);

/***************************COOK CONTROLLER********************************************* */

app.controller('cook_register', ['$scope', '$http','$location','$cookieStore','$timeout', function ($scope, $http,$location,$cookieStore,$timeout) {
 
    $scope.cook_login_check_for_cookie =function(){

        
        if($cookieStore.get('cook_logged_in')==undefined){
              $location.path('/cook_login');
            
        }else if($cookieStore.get('cook_logged_in')!=undefined)
        {
          

        }
    }

    $scope.check_if_cook_basic_entered_complete_pending=function(){
      
         if($cookieStore.get('basic_entered_complete_pending')==undefined){

           $location.path('/cook_create');  
        }else
        {
            console.log('cookie found');
        $location.path('/cook_basic_info');
        }
    }
          


    $scope.logout=function(){

      if($cookieStore.get('cook_logged_in')==undefined){
              $location.path('/cook_login');
            
        }else
        {
            $cookieStore.remove("cook_logged_in");
            $location.path('/');

        }
    };
$scope.cook_details={};

$scope.cook_success_detail={};

$scope.cook_complete_details={};
$scope.cook_initial_info={} //this is used when cook 1 st step registration completed

$scope.after_success_reg_message=false;

    $scope.after_success_login_message=false;
    $scope.after_failed_login_message=false;   
    $scope.already_register_check=false;

$scope.isDisabled=false; $scope.error_check1=false;
    $scope.show_company=false;
    $scope.show_basic=true;
    $scope.show_food_section=false;

    $scope.getCookRegisterData=function(){

          if($cookieStore.get('basic_entered_complete_pending')==undefined){

           $location.path('/cook_food');  
        }
        else if($cookieStore.get('cook_logged_in')!=undefined){

           $location.path('/cook_food');  
        }
        else
        {
            console.log('cookie found');
            $scope.cook_complete_details=$cookieStore.get('basic_entered_complete_pending');
        }
        
                    
     }

    $scope.form_section=function(){

        if($scope.show_basic==true && $scope.show_company==false && $scope.show_food_section==false)
        {
        $scope.show_basic=false;
        $scope.show_company=true;
        $scope.show_food_section=false;
        }
        else if($scope.show_basic==false && $scope.show_company==true && $scope.show_food_section==false)
        {
        $scope.show_basic=false;
        $scope.show_company=false;
        $scope.show_food_section=true;
        }
       
    }

    $scope.add_cook_details=function(cook_details){
       
       $scope.u=cook_details;
       $scope.cook_details="";
    
     $scope.error_check1=false;
        $scope.isDisabled=true;
    
                          $http({
                                method: "POST",
                                url: "cook/add-cook-info",
                                data: $scope.u
                            }).then(function mySucces(response) {

                                $scope.after_success_reg_message=true;
                                
                                   $timeout( function()
                                 { 
                                     $scope.cook_complete_details=response.data;

                                     $cookieStore.put('basic_entered_complete_pending', $scope.cook_complete_details);
                                     $scope.after_success_reg_message=false;
                                     $location.path('/cook_basic_info');
                                     $scope.isDisabled=false;
                                    
                                    }, 4000);

                            console.log($scope.cook_complete_details);
                            
                            //    console.log(response.data.cook_name);

                            }, function myError(response) {
                                     $scope.cook_details="";
                                     $scope.already_register_check=true;
                                     $timeout( function()
                                 { 
                                     $scope.already_register_check=false;
                                    
                                    }, 4000);
                                
                                console.log('EMAIL ALREADY EXIST');
                            });
    
    
 

}

$scope.cook_status=false;

$scope.cook_login_check=function(cook_login){

    //  console.log(cook_login);
      $http({
            method: "POST",
            url: "cook/cook_login_check",
            data:cook_login
        }).then(function mySucces(response) {
             
             $scope.cook_login="";
             $scope.cook_success_detail=response.data[0];
             $scope.after_success_login_message=true;    
             $cookieStore.put('cook_logged_in', response.data[0]._id);
                   $timeout( function()
                      { 
                          
                                                            
                        $scope.after_success_login_message=false;
                        $location.path('/cook_food');
                        

                     }, 4000);
                     
        }, function myError(response) {
               
                   if(response.data=="cook not find"){
                       $scope.after_failed_login_message=true;
                        $timeout( function()
                        { 
                           $scope.after_failed_login_message=false;

                        }, 4000);
                   }
                   else if(response.data=="account disabled")
                   {
                      
                         $scope.cook_status=true;
                        $timeout( function()
                        { 
                           $scope.cook_status=false;

                        }, 4000);
                   }
            
        });

}
    
    $scope.cook_profile_complete = function (cook_all_details) {

       
        console.log(cook_all_details);
        $http({
            method: "POST",
            url: "cook/complete-cook-profile",
            data:cook_all_details
        }).then(function mySucces(response) {

           
              $cookieStore.remove("basic_entered_complete_pending");
              $cookieStore.put('cook_logged_in', response.data._id);
           
              $location.path('/cook_food');
           
        }, function myError(response) {

        });


    
}

$scope.cook_password_update_detail={};
    $scope.after_success_pass_update=false;
    $scope.after_failed_pass_update=false;
    
    
        $scope.cook_password_update=function(pass_update_detail){

            
                $scope.u=pass_update_detail;
                $scope.cook_password_update_detail="";
                $scope.u.cook_id=$cookieStore.get('cook_logged_in');
                console.log( $scope.u);
            
             $http({
                    method: "POST",
                    url: "cook/cook-pass-update",
                    data:pass_update_detail
                    }).then(function mySucces(response) {

                      
                            $scope.after_success_pass_update=true;
                      $timeout( function()
                      { 
                          
                            $scope.after_success_pass_update=false;                                     
                      
                     }, 3000);
                
                    }, function myError(response) {

                     
                            $scope.after_failed_pass_update=true;
                           $timeout( function()
                      { 
                          
                            $scope.after_failed_pass_update=false;                                
                   
                     }, 3000);
                });

        }

$scope.cook_acount_deactivate_details={};
$scope.after_success_account_deactivate=false;
$scope.after_failed_account_deactivate=false;

    $scope.deactivate_cook=function(cook_deactivate_detail){

          $scope.u=$scope.cook_acount_deactivate_details;
          $scope.u.cook_id=$cookieStore.get('cook_logged_in');
        //  $scope.manage_account_update_user="";
              console.log($scope.u);
            $http({
                            method: "POST",
                            url: "cook/cook-account-deactivate",
                            data: $scope.u
                            }).then(function mySucces(response) {
                                console.log(response);
                                 $scope.cook_acount_deactivate_details="";
        
                                 $scope.after_success_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_account_deactivate=false;                
                                    $cookieStore.remove("cook_logged_in");
                                    $location.path('/');
                            }, 5000);
                              
                            }, function myError(response) {
                                console.log(response);
                                 $scope.after_failed_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_failed_account_deactivate=false;                
                        
                            }, 3000);
                            
                            }); 
  

    }

     $scope.after_success_profile_update=false;
// $scope.cook_profile_update_data={};
// $scope.cook_profile_update_status=false;
$scope.cook_profile_update=function(cook_time_data){
         console.log(cook_time_data);
          $scope.u=cook_time_data;

          $scope.u.cook_id=$cookieStore.get('cook_logged_in');
          console.log('THIS IS CHECK');
         
          $scope.cook_profile_update_data="";
                $http({
                            method: "POST",
                            url: "cook/cook-profile-update",
                            data:$scope.u
                            }).then(function mySucces(response) {

                                   $scope.after_success_profile_update=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_profile_update=false;
                                  
                            }, 3000);
                                
                            }, function myError(response) {

                            
                            });  
    }

  $scope.cook_data_for_view={};
 
  $scope.get_cook_profile_data=function(){

         $scope.u={};
     
       $scope.u.cook_id=$cookieStore.get('cook_logged_in');
       
            $http({
                            method: "POST",
                            url: "cook/get-cook-profile-data",
                            data:$scope.u
                            }).then(function mySucces(response) {
                                $scope.cook_data_for_view=response.data[0];
                                console.log($scope.cook_data_for_view);
                            //       $scope.cook_profile_update_status=true;
                            //     $timeout( function()
                            // { 
                            //     console.log('yessssssss');
                            //        $scope.cook_profile_update_status=false;                
                                  
                            // }, 3000);
                                
                            }, function myError(response) {

                            
                            });  
    };

      // selected checkebox for user/cooks
    $scope.selection = [];

    // toggle selection for a given cook/user by name
    $scope.toggleSelection = function toggleSelection(val) {
        
        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(val);
            console.log($scope.selection);
            
            // $scope.food_details.occassion_list = $scope.selection;
        }
    }

$scope.after_success_company_details=false;

$scope.update_cook_company_details=function(){

    console.log($scope.cook_data_for_view);
             $http({
                            method: "POST",
                            url: "cook/cook-company-details-update",
                            data:$scope.cook_data_for_view
                            }).then(function mySucces(response) {
                             
                                  $scope.after_success_company_details=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_company_details=false;                
                                  
                            }, 3000);
                                
                            }, function myError(response) {

                            
                            });  
}

}]);


/************************************USER CONTROLLER*************************** */

app.controller('user_register', ['$scope', '$http','$location','$cookieStore','$timeout','$routeParams', function ($scope, $http,$location,$cookieStore,$timeout,$routeParams) {

       $scope.auth=function(){

        if($cookieStore.get('s3cr3t_user')==undefined){

           $location.path('/');
        }else
        {
            console.log('cookie found');

        }
        
    }
          
    $scope.login_check=function(){

        
        if($cookieStore.get('s3cr3t_user')==undefined){
              $location.path('/user_login');
            
        }else
        {
           
        }
    }   
    $scope.login_check_for_signup=function(){

        
        if($cookieStore.get('s3cr3t_user')==undefined){
              $location.path('/user_create');
            
        }else
        {
            $location.path('/my_profile_update');

        }
    }
    $scope.logout=function(){

      if($cookieStore.get('s3cr3t_user')==undefined){
              $location.path('/cook_login');
            
        }else
        {
            $cookieStore.remove("s3cr3t_user");
            $location.path('/');

        }
    };
    $scope.user_details={};
    $scope.user_login={};

    $scope.after_success_login_message=false;
    $scope.after_failed_login_message=false;   
    
     $scope.add_user_details=function(user_details){

         $scope.u=user_details;
        
    
                          $http({
                                method: "POST",
                                url: "user/add-user-info",
                                data:$scope.u
                            }).then(function mySucces(response) {

                               console.log(response);
                                $scope.user_details="";
                                 $scope.after_success_reg_message=true;
                               
                                 $timeout( function()
                                 { 
                                      $scope.after_success_reg_message=false;
                                    
                                    }, 6000);

                          

                            }, function myError(response) {

                                console.log(response);
                            });
    
}

    $scope.verify_user_params=function(){

        //    console.log('this is ID--'+$routeParams.user_id);
    
                          $http({
                                method: "GET",
                                url: "user/user-verify/"+$routeParams.user_id
                                
                            }).then(function mySucces(response) {

                               console.log(response.data._id);
                               $cookieStore.put('s3cr3t_user', response.data._id);
                                 $location.path('/my_profile_update');                               
                            }, function myError(response) {

                                console.log(response);
                            });
    
}


$scope.user_status=false;

    $scope.user_login_check=function(user_login){
    
      $scope.u=user_login;
       $scope.user_login="";
                      
     console.log(user_login);

            $http({
                    method: "POST",
                    url: "user/user-login",
                    data:$scope.u
                }).then(function mySucces(response) {

                      console.log(response); 
               if(response.data=="user not found"){
                       $scope.after_failed_login_message=true;
                        $timeout( function()
                        { 
                           $scope.after_failed_login_message=false;

                        }, 4000);
                   }
                   else if(response.data=="account disabled")
                   {
             
                         $scope.user_status=true;
                        $timeout( function()
                        { 
                           $scope.user_status=false;

                        }, 4000);
                   }
                   else{
            
                         $scope.after_success_login_message=true;    
                          $cookieStore.put('s3cr3t_user', response.data[0]._id);
                           $timeout( function()
                                 { 
                                       
                                         $scope.after_success_login_message=false;
                                         $location.path('/my_profile_update');

                                    }, 4000);
                   }
                }, function myError(err) {
                    $scope.after_failed_login_message=true;
                    $timeout( function()
                                 { 

                                        $scope.after_failed_login_message=false;

                                    }, 4000);
                    console.log('not found');
                });

    }


$scope.user_password_update_detail={};
    $scope.after_success_pass_update=false;
    $scope.after_failed_pass_update=false;
    
       $scope.user_password_update=function(pass_update_detail){

                $scope.u=pass_update_detail;
                $scope.user_password_update_detail="";
                $scope.u.user_id=$cookieStore.get('s3cr3t_user');
                console.log( $scope.u);
            
                    $http({
                            method: "POST",
                            url: "user/user-pass-update",
                            data: $scope.u
                            }).then(function mySucces(response) {

                            
                                    $scope.after_success_pass_update=true;
                            $timeout( function()
                            { 
                                
                                    $scope.after_success_pass_update=false;                                     
                            
                            }, 3000);
                        
                            }, function myError(response) {

                            
                                    $scope.after_failed_pass_update=true;
                                $timeout( function()
                            { 
                                
                                    $scope.after_failed_pass_update=false;                                
                        
                            }, 3000);
                        });
       };

$scope.user_address_detail={};
 
            $scope.update_user_address=function(address_details){
                 $scope.u=address_details;
                 $scope.user_address_detail="";
                 $scope.u.user_id=$cookieStore.get('s3cr3t_user');
              
                  $http({
                            method: "POST",
                            url: "user/user-address-add",
                            data: $scope.u
                            }).then(function mySucces(response) {

                                $scope.getUserAddress();
                                console.log('user address updating');
                            }, function myError(response) {

                            
                            });         
                       
                
            }

 $scope.user_address_list={};   // this variable is used to get/store user address

        $scope.getUserAddress=function(){

            $scope.user_id={id:$cookieStore.get('s3cr3t_user')};
            // console.log($scope.user_id);
             $http({
                            method: "POST",
                            url: "user/get-user-address",
                            data:$scope.user_id
                            }).then(function mySucces(response) {

                                $scope.user_address_list=response.data[0].address;
                                console.log(response.data[0].address);
                            }, function myError(response) {

                            
                            });   

        }

$scope.manage_account_update_user={};
$scope.manage_account_deactivate_user={};
$scope.after_success_account_update=false;
$scope.after_success_account_deactivate=false;
$scope.after_failed_account_deactivate=false;

      $scope.manage_account_user=function(acc_update_details){
         $scope.u=$scope.manage_account_update_user;
         $scope.u.user_id=$cookieStore.get('s3cr3t_user');
         $scope.manage_account_update_user="";
       
            $http({
                            method: "POST",
                            url: "user/user-account-update",
                            data: $scope.u
                            }).then(function mySucces(response) {
                                
                               
                             $scope.after_success_account_update=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_account_update=false;                
                        
                            }, 3000);

                            }, function myError(response) {

                                
                            }); 
    }
    
   
    
     $scope.manage_account_user_deactivate=function(acc_update_details){

       
         $scope.u=$scope.manage_account_deactivate_user;
          $scope.u.user_id=$cookieStore.get('s3cr3t_user');
        //  $scope.manage_account_update_user="";
              console.log($scope.u);
            $http({
                            method: "POST",
                            url: "user/user-account-deactivate",
                            data: acc_update_details
                            }).then(function mySucces(response) {
                                  $scope.manage_account_deactivate_user="";
        
                                 $scope.after_success_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_success_account_deactivate=false;                
                                     $cookieStore.remove("s3cr3t_user");
                                    $location.path('/');
                            }, 3000);
                              
                            }, function myError(response) {

                                 $scope.after_failed_account_deactivate=true;
                                $timeout( function()
                            { 
                                
                                   $scope.after_failed_account_deactivate=false;                
                                  
                            }, 3000);
                            
                            }); 
    }

$scope.user_profile_update_data={};
$scope.user_profile_update_status=false;
$scope.user_profile_update=function(user_profile_details){
          
          $scope.u=$scope.user_profile_update_data;
          $scope.u.user_id=$cookieStore.get('s3cr3t_user');
          $scope.user_profile_update_data="";
                $http({
                            method: "POST",
                            url: "user/user-profile-update",
                            data:$scope.u
                            }).then(function mySucces(response) {

                                  $scope.user_profile_update_status=true;
                                $timeout( function()
                            { 
                               
                                   $scope.user_profile_update_status=false;                
                                  
                            }, 3000);
                                
                            }, function myError(response) {

                            
                            });  

}

  
}]);

/*******************************ADMIN CONTROLLER*************************** */

app.controller('admin_controller', ['$scope', '$http','$rootScope','$timeout', function ($scope, $http,$rootScope,$timeout) {

       $rootScope.stylesheets ="";
       $rootScope.stylesheets = [
                 {href: '../../pages/admin/css/reset.css', type:'text/css'},
                 {href: '../../../pages/admin/css/style.css', type:'text/css'},
                 {href: '../../pages/admin/css/media.css', type:'text/css'},
                  {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},
        ];

$scope.user_info={};
$scope.cook_info={};
$scope.global_setting={};
$scope.social_setting={};
$scope.success_user_add=false;
$scope.success_cook_delete=false;
$scope.success_user_delete=false;
 $scope.user_list_deatils={};
 $scope.cooks_list_deatils={};

        $scope.add_user_via_admin=function(user_info){
            $scope.u={};
            $scope.u=user_info;
            $scope.user_info="";
                    $http({
                                method: "POST",
                                url: "admin/add-user-info",
                                data:$scope.u
                            }).then(function mySucces(response) {

                                console.log(response.data);
                                 $scope.user_details="";

                                $scope.success_user_add=true;
                                 $timeout( function()
                                 { 
                                      $scope.success_user_add=false;
                                    
                                    }, 4000);

                          

                            }, function myError(response) {

                            });
 

        };
        
 $scope.add_cook_via_admin=function(cook_info){
           
            $scope.u={};
            $scope.u=cook_info;
            $scope.cook_info="";

              console.log(cook_info);
               $http({
                                method: "POST",
                                url: "admin/add-cook-info",
                                data:cook_info
                            }).then(function mySucces(response) {

                                console.log(response.data);
                                $scope.cook_details="";
                               
                               $scope.success_user_add=true;
                                 $timeout( function()
                                 { 
                                   $scope.success_user_add=false;
                                    
                                    }, 4000);

                            
                            
                            //    console.log(response.data.cook_name);

                            }, function myError(response) {
                                //      $scope.cook_details="";
                                //      $scope.already_register_check=true;
                                //      $timeout( function()
                                //  { 
                                //      $scope.already_register_check=false;
                                    
                                //     }, 5000);
                                
                                // console.log('EMAIL ALREADY EXIST');
                            });
            // $scope.u={};
            // $scope.u=cook_info;
            // $scope.cook_info="";
            //         $http({
            //                     method: "POST",
            //                     url: "admin/add-cook-info",
            //                     data:$scope.u
            //                 }).then(function mySucces(response) {

            //                     console.log(response.data);
            //                      $scope.user_details="";

            //                     $scope.success_user_add=true;
            //                      $timeout( function()
            //                      { 
            //                           $scope.success_user_add=false;
                                    
            //                         }, 5000);

                          

            //                 }, function myError(response) {

            //                 });
 

        };
      
    //  $scope.stylesheets = [
         
    //       {href: '../../pages/admin/css/reset.css', type:'text/css'},
    //       {href: '../../../pages/admin/css/style.css', type:'text/css'},
    //       {href: '../../pages/admin/css/media.css', type:'text/css'},
    //       {href: '../../pages/admin/fonts/font-awesome/css/font-awesome.min.css', type:'text/css'},
          
          
    //     ];

    //     $scope.scripts = [
        
    //       {href: '../../pages/admin/js/fm.parallaxator.jquery.js', type:'text/javascript'},
    //       {href: '../../pages/admin/js/global.js', type:'text/javascript'},
    //       {href: '../../pages/admin/js/min.js', type:'text/javascript'},
          
          
    //     ];

$scope.loadUsers=function(){

           $http({
                                method: "GET",
                                url: "admin/get-all-users",
                               
                            }).then(function mySucces(response) {
                                
                                $scope.user_list_deatils=response.data;
                                 console.log($scope.user_list_deatils);
                            }, function myError(response) {

                            });

                };

$scope.loadCooks=function(){

console.log('asdfasd');
           $http({
                                method: "GET",
                                url: "admin/get-all-cooks",
                               
                            }).then(function mySucces(response) {

                                $scope.cooks_list_deatils=response.data;
                                 console.log($scope.cooks_list_deatils);
                            }, function myError(response) {

                            });

                };


    
    // selected checkebox for user/cooks
    $scope.selection = [];

    // toggle selection for a given cook/user by name
    $scope.toggleSelection = function toggleSelection(val) {
        
        var idx = $scope.selection.indexOf(val);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(val);
            console.log($scope.selection);
            
            // $scope.food_details.occassion_list = $scope.selection;
        }
    }
     
    $scope.cook_delete=function(){  
        
        if($scope.hasAllCookChecked)
        {
           $http({
                             method: "GET",
                             url: "admin/delete-all-cook",
                             
                            }).then(function mySucces(response) {
                                $scope.hasAllCookChecked.selected=false;
                                $scope.success_cook_delete=true;
                               $scope.loadCooks();
                                 $timeout( function()
                                 { 
                                  $scope.success_cook_delete=false;
                                    
                                    }, 4000);

                            }, function myError(response) {
                                console.log('err');
                            });
        }
        else
        {
               $http({
                             method: "POST",
                             url: "admin/delete-cook",
                             data:$scope.selection
                            }).then(function mySucces(response) {
                                //  $scope.cooks_list_deatils=response;
                                $scope.success_cook_delete=true;
                                $scope.loadCooks();
                             
                               $timeout( function()
                                 { 
                                  $scope.success_cook_delete=false;
                                    
                                    }, 4000);

                            }, function myError(response) {
                                console.log('err');
                            });
        }
            // console.log($scope.selection);
           

                };

$scope.user_delete=function(){  
        
      if($scope.hasAllCookChecked)
        {
            console.log('all seel');
           $http({
                             method: "GET",
                             url: "admin/delete-all-user",
                             
                            }).then(function mySucces(response) {
                                $scope.hasAllCookChecked.selected=false;
                                $scope.success_user_delete=true;
                               $scope.loadUsers();
                                 $timeout( function()
                                 { 
                                  $scope.success_user_delete=false;
                                    
                                    }, 4000);

                            }, function myError(response) {
                                console.log('err');
                            });
         }
    else{

                $http({
                             method: "POST",
                             url: "admin/delete-user",
                             data:$scope.selection
                            }).then(function mySucces(response) {
                                //  $scope.cooks_list_deatils=response;
                              
                                $scope.success_user_delete=true;
                                $scope.loadUsers();
                               
                               $timeout( function()
                                 {
                                
                                    $scope.success_user_delete=false;
                                    
                                    }, 4000);

                            }, function myError(response) {
                                console.log('err');
                             });

         

    }

          
              
              };
    

            $scope.save_global_setting=function(settings){

                
                 $http({
                             method: "POST",
                             url: "admin/save-global-setting",
                             data:settings
                            }).then(function mySucces(response) {
                              
                                $scope.global_setting="";
                            }, function myError(response) {
                                console.log('err');
                             });
            }

             

/*******************SAVING GLOBAL SETTINGS*********** */

$scope.save_information_page_details={};
$scope.after_success_info_add=false;

            $scope.save_information_page=function(ss){

                       $http({
                             method: "POST",
                             url: "admin/add-info-pages",
                             data:ss
                            }).then(function mySucces(response) {
                              
                                $scope.save_information_page_details="";
                                $scope.after_success_info_add=true;
                               
                               $timeout( function()
                                 {
                                
                                    $scope.after_success_info_add=false;
                                    
                                    }, 3000);
                            }, function myError(response) {
                                console.log('err');
                             });

            }

/******************SAVE COUPON************ */

$scope.save_coupon_details={};
$scope.after_success_coupon_add=false;
        $scope.save_coupon_page=function(coupon_details){
              $http({
                             method: "POST",
                             url: "admin/add-coupon-info",
                             data:coupon_details
                            }).then(function mySucces(response) {
                              
                              $scope.save_coupon_details="";
                              
                                $scope.after_success_coupon_add=true;
                               
                               $timeout( function()
                                 {
                                
                                    $scope.after_success_coupon_add=false;
                                    
                                    }, 3000);
                            }, function myError(response) {
                                console.log('err');
                             });   
        }


 /******************SAVE SOCIAL INFOS************ */

$scope.save_social_details={};
$scope.after_success_social_info_add=false;
        $scope.save_social_setting=function(social_details){
        
            console.log(social_details);
              $http({
                             method: "POST",
                             url: "admin/add-social-info",
                             data:social_details
                            }).then(function mySucces(response) {
                              
                              $scope.save_social_details="";
                              
                                $scope.after_success_social_info_add=true;
                               
                               $timeout( function()
                                 {
                                
                                    $scope.after_success_social_info_add=false;
                                    
                                    }, 3000);
                            }, function myError(response) {
                                console.log('err');
                             });   
         }       

}]);


//my account tabs active class add
(function () {
    angular.module('autoActive', ['ngCookies','ckeditor','720kb.datepicker'])
        .directive('autoActive', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    function setActive() {
                        var path = $location.path();
                        if (path) {
                            angular.forEach(element.find('.list'), function (li) {
                                var anchor = li.querySelector('a');
                                if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                    angular.element(li).addClass('active');
                                } else {
                                    angular.element(li).removeClass('active');
                                }
                            });
                        }
                    }

                    setActive();

                    scope.$on('$locationChangeSuccess', setActive);
                }
            }
        }]);
} ());
