// CommonDatabase.js
import axios from 'axios';
import {getAPI} from './config.js';


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
	 		throw new Error(user);
	 	}
	},function(){
		throw new Error(null);
	});
}

user.prototype.storeUserInLocal=function(){
	
}

user.prototype.getUserFromLocal=function(){
	
}

user.prototype.getUer=function(){
	return this.data;
}
user.prototype.setUser=function(user){
	return this.data=user;
}
var user=new User();
export{user};