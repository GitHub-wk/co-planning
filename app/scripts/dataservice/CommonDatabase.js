// CommonDatabase.js
import axios from 'axios';
import {getAPI} from './config.js';
import Util from '../core/Util.js';

var userLocalName='$$user';
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
	Util.storeData(userLocalName,this.data);
}

User.prototype.getUserFromLocal=function(){
	this.data=Util.getData(userLocalName);
	return this.data;
}

User.prototype.getUser=function(){
	return this.data;
}
User.prototype.setUser=function(user){
	this.data=user;
	this.storeUserInLocal();
	return this.data;
}

var user=new User();

function asynData(apiName, data={},urlFormat){
	var api=getAPI(apiName,urlFormat);
	return axios[api.method](api.url,data)
	.then(function(data){
		var getData=data.data;
		if(getData.status===1)
		{
			return getData;
		}
		else{
			throw new Error(getData.msg);
		}
	},function(){
		throw new Error(null);
	})
}

export{user, asynData};