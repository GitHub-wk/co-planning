// user_entry.js
import {user} from './scripts/dataservice/CommonDatabase.js';
import axios from 'axios';
import {getAPI} from './scripts/dataservice/config.js';
var userData=user.getUserFromLocal();

var projectListApi=getAPI('GetProjectList',{pageNumber:0});

axios[projectListApi.method](projectListApi.url,{email:userData.email,unionId:userData.unionId})
	.then(function(data){
		console.log(data);
	},function(error){
		console.log(error);
	})


console.log(userData);