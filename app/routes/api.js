var User=require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'pradep';






module.exports=function(router){
    router.post('/users',function(req,res){
          var user=new User();
  user.username=req.body.username;
  user.password=req.body.password;
  user.email=req.body.email;
 if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""){
     res.json({success:false,message:"username email not provided"});
 }else{
     user.save(function(err){
         if(err){
            
              res.json({success:false,message:"user exits"});
         }else{
           
              res.json({success:true,message:"user created"});
         }
     });
    }
});


router.post('/authenticate',function(req,res){
 User.findOne({username:req.body.username}).select('email password username').exec( function(err,user){
        if(err) throw err;
        if(!user){
            res.json({success:false,message:'not authenticate user'});
        }else if(user){

            if(req.body.password){
                 var validPassword=user.comparePassword(req.body.password);
            }else{
                  res.json({success:false,message:'no password'});
            }
  
            if(!validPassword){
                 res.json({success:false,message:'not authenticate password'});
            }else{
                var token=jwt.sign({username:user.username,email:user.email},secret,{expiresIn:'24h'});
                 res.json({success:true,message:'user authenticate ',token:token});
            }
        }
    });
});
return router;
}





