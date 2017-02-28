// userLogin.js
var userModel=require('../model/userModel');
var userLayer=require('../layers/userLayer.js');
var STATUS=require('./STATUS_CONSTANT.js');
var Q=require('q');
function userLogin(opts){
	var defer=Q.defer();
	userModel.findOne({email:opts.email,password:opts.password},function(error,user){
		var back=null;
        if (error || !user) {
            back = { msg: STATUS.LOGIN_ERROR.lng, data: null, code: STATUS.LOGIN_ERROR.code ,status:STATUS.ERROR.code}
            defer.reject(back);
        }
		else{
			var user=userLayer.add(user);
			back={msg:STATUS.LOGIN_SUCCESS.lng,data:user,code:STATUS.LOGIN_SUCCESS.code,status:STATUS.SUCCESS.code};
			defer.resolve(back);
		}		
	});
	return defer.promise;
}

module.exports=userLogin;