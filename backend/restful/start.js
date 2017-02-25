// start.js
var express=require('express');
var beforeRouter=require('./before.js');
var userRouter=require('./user.js');
var uploadRouter = require('./upload.js');
var projectRouter = require('./project.js');
var afterRouter=require('./after.js');

var app=express();
app.use('/',beforeRouter,[userRouter,projectRouter,uploadRouter],afterRouter);
app.use(function(err,req,res,next){
	console.log(err);
	res.json({msg:'has a error',error:err});
	next();
})
app.use(function(req,res){
	res.json({msg:'not found'});
})
var start=function(port){
	var port=port||8082;
	app.listen(port);
	console.log('restful service start on:'+port);
}

module.exports={
	app:app,
	start:start,
}