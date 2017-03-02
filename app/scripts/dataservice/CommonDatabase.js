// CommonDatabase.js
import axios from 'axios';
import {getAPI} from './config.js';
import Util from '../core/Util.js';


var User=function(){
	this.data=null;

}
User.prototype.asynLogin=function(email,psw){
	var userAPI=getAPI('Login');
	var scope=this;
    return axios[userAPI.method](userAPI.url,{
		email:email,
		password:psw,
	}).then(function(data){
		var user=data.data;
		if(user.data)
	 	{
	 		scope.setUser(user.data);
	 		return user;
	 	}
	 	else{
	 		throw new Error(user.msg);
	 	}
	},function(){
		throw new Error(null);
	});
}

User.prototype.storeUserInLocal=function(){
	
}

User.prototype.getUserFromLocal=function(){
	
}

User.prototype.getUser=function(){
	return this.data;
}
User.prototype.setUser=function(user){
	return this.data=user;
}

var user=new User();

function asynData(apiName, data={}){
	return axios[apiName.method](apiName.url,data)
	.then(function(data){
		console.log(data);
		return data;
	},function(){
		throw new Error('failed to get data from server');
	})
}

export{user, asynData ,getAPI};