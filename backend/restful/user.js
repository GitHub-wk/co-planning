//user.js
var express=require('express');
var router=express.Router();
var userModel=require('../database/model/userModel');
var userLayer=require('../database/layers/userLayer.js');
var STATUS=require('./CONSTANT.js').STATUS;
//login restful
router.post('/login',function(req,res){
	userModel.findOne({userName:req.body.userName,password:req.body.password},function(error,user){
		var back=null;
		if(error||!user){ back={msg:STATUS.LOGIN_ERROR.lng,data:null,code:STATUS.LOGIN_SUCCESS.code}}
		else{
			console.log('login',req.body.userName);
			var user=userLayer.add(user);
			back={msg:STATUS.LOGIN_SUCCESS.lng,data:user,code:STATUS.LOGIN_SUCCESS.code};

		}
		res.json(back);

	})
});


//registe restful
router.post('/register',function(req,res){
	var user=new userModel({
		userName:req.body.userName,
		email:req.body.email,
		password:req.body.password,
	});
	user.save(function(error){
		var back=null;
		if(error){
			back={msg:STATUS.REGISTER_ERROR.lng,data:null,code:STATUS.REGISTER_ERROR.code};
		}
		else{
			back={msg:STATUS.REGISTER_SUCCESS.lng,data:user,code:STATUS.REGISTER_SUCCESS.code};
			console.log('注册成功',user.email);
		}
		res.json(back);
	});
});

module.exports=router;