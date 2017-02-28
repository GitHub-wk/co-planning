// start.js
import axios from 'axios';
import io from 'socket.io-client';
import {user} from '../dataservice/CommonDatabase.js';
import {socketUrl} from '../dataservice/config.js';
import {BuildingAction} from '../dataservice/WorldAction.js';

//TODO test
user.asynLogin('1249561679@qq.com','19920910wk').then(function(data){
	console.log(data);
	login();
},function(error){
	console.log(error.message);
});


var socket=io.connect(socketUrl);
socket.on('connect',function(){
	login();
});

socket.on('login',function(data){
	console.log('login:',data);
});

socket.on('memberChange',function(data){
	console.log('memberChange',data);
});

socket.on('refresh',function(project){
	console.log(project);
});

var login=function(){
	var userData=user.getUser();
	if(!userData) return false;
	socket.emit('login',{
		email:userData.email,
		unionId:userData.unionId,
		projectId:userData.joinedProjectId||'58b127ce459b74334090d5f6',
	});
}
export{
	socket,
}

