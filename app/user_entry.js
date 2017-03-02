// user_entry.js
import {user,asynData} from './scripts/dataservice/CommonDatabase.js';
import axios from 'axios';
import {getAPI} from './scripts/dataservice/config.js';
var userData=user.getUserFromLocal();

asynData('GetProjectList',{email:userData.email,unionId:userData.unionId},{pageNumber:0})
.then(function(data){
	console.log(data);
},function(error){
	console.log(error);
})

console.log(userData);