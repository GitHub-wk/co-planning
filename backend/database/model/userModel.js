// meModel.js
var mongoose=require('mongoose');
var userSchema=mongoose.Schema({
	userName:String,
	email:String,
	password:String,
	faceImg:String,
});
var userModel=mongoose.model('user',userSchema);
module.exports=userModel;
