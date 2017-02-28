// meModel.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var LNG = require('./CONSTANT.js').LNG;
var userSchema=mongoose.Schema({
	userName:{
		type:String,
		required:LNG.USERNAME_REQUIRED,
	},
	email:{
		type:String,
		required: LNG.EMAIL_REQUIRED,
		index:true,
        unique: true,
        uniqueCaseInsensitive: true
	},
	password:{
		type:String,
		required:LNG.PASSWORD_REQUIRED,
	},
	faceImg:{
		type:String,
		default:'noPic.jpg'
    },
    createDate: {
        type:Date,
        default: Date.now
    }
});

function emialValidator(str){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}
function userNameValidator(str) {
    var reg = /^[a-zA-Z\d]\w{3,11}[a-zA-Z\d]$/;
    return reg.test(str);
}
function passwordValidator(str) {
    var reg = /^(\w){6,20}$/;
    return reg.test(str);   
}
userSchema.path('email').validate(emialValidator, LNG.EMAIL_FORMAT_ERROR);
userSchema.path('userName').validate(userNameValidator,LNG.USERNAME_FORMATE_ERROR);
userSchema.path('password').validate(passwordValidator, LNG.PASSWORD_FORMATE_ERROR);
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


var userModel=mongoose.model('user',userSchema);
module.exports=userModel;
