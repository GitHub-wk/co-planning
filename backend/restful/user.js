//user.js
var express=require('express');
var router=express.Router();
var userModel=require('../database/model/userModel');

var CODE=require('./CONSTANT.js').CODE;
//login restful
router.post('/login',function(req,res){
	userModel.findOne({userName:req.body.userName,password:req.body.password},function(error,user){
		var back=null;
		if(error||!user){ back={msg:'登陆失败',data:null,code:CODE.LOGIN_ERROR}}
		else{
			console.log('login',req.body.userName);
			back={msg:'登陆成功',data:user,code:CODE.LOGIN_SUCCESS};
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
			back={msg:'注册失败',data:null,code:CODE.REGISTER_ERROR};
		}
		else{
			back={msg:'注册成功',data:user};
			console.log('注册成功',user.email,code:CODE.REGISTER_SUCCESS);
		}
		res.json(back);
	});
});

module.exports=router;