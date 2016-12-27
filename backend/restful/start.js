// start.js
var express=require('express');
var beforeRouter=require('./before.js');
var userRouter=require('./user.js');
var uploadRouter=require('./upload.js');
var afterRouter=require('./after.js');

var app=express();
app.use('/',beforeRouter,[userRouter,uploadRouter],afterRouter);

var start=function(port){
	var port=port||8082;
	app.listen(port);
	console.log('restful service start on:'+port);
}

module.exports={
	app:app,
	start:start,
}