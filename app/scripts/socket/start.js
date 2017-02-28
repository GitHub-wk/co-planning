// start.js
import axios from 'axios';
import io from 'socket.io-client';
import {user} from '../dataservice/CommonDatabase.js';
import {socketUrl} from './config.js';
var user=user.getUser();
var socket=io.connect(socketUrl);

socket.on('connect',function(){
	socket.emit('login',{
	email:user.email,
	unionId:user.unionId,
	projectId:user.joinedProjectId,
});
});

socket.on('login',function(data){
	console.log('login:',data);
});

socket.on('memberChange',function(data){
	console.log('memberChange',data);
});