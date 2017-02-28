// after.js
var express=require('express');
var router=express.Router();
//after

router.use(function(err,req,res,next){
	console.log(err);
	res.json({msg:'has a error',data:err});
	next();
});

router.use(function(req,res){
	res.json({msg:'not found',data:null});
});

module.exports=router;