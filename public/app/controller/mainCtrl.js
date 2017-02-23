angular.module("mainController",['authServices'])
.controller("mainCtrl",function(Auth, $timeout,   $location ){
 var app=this;
   

if(Auth.isLoggedIn()){
    console.log("success to login");
}else{
    console.log("error in login");
}


   this. doLogin=function(loginData){
       app.loading=true;
       app.errorMsg=false;
        console.log("login userdata submited");
        Auth.login(app.loginData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.loading=false;
                app.successMsg=data.data.message;
                $timeout(function(){
                    $location.path('/about');
                },2000);
                
            }else{
                app.loading=false;
                app.errorMsg=data.data.message;
            }
        });
    };

    this.logout=function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        });
     }
   })


