// start.js
var express=require('express');
var beforeRouter=require('./before.js');
var userRouter=require('./user.js');
var uploadRouter = require('./upload.js');
var projectRouter = require('./project.js');
var afterHandler=require('./after.js');

var app=express();
app.use('/',beforeRouter,[userRouter,projectRouter,uploadRouter]);
app.use(afterHandler.errorHandler);
app.use(afterHandler.notFoundHandler);


var start=function(port){
	var port=port||8082;
	app.listen(port);
	console.log('restful service started on:'+port);
}

module.exports={
	app:app,
	start:start,
}