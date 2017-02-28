// config.js
/**
 * @author  wk
 * @date 2016/11/28
 * @description public config
 */
import {Util} from '../core/core.js';
var HTTPMETHOD={
	"GET":1,
	"POST":2,
	"PUT":3,
	"DELETE":4
}
var socketUrl='ws://localhost:3000';

var _baseUrl="http://localhost:8082";
var _apiList={
	Register:{
		url:baseUrl+'/user/register',
		method:HTTPMETHOD.POST
	},
	Login:{
		url:baseUrl+'/user/login',
		method:HTTPMETHOD.POST
	},
	Logout:{
		url:baseUrl+'/user/logout',
		method:HTTPMETHOD.POST
	},
	CreatProject:{
		url:baseUrl+'/project',
		method:HTTPMETHOD.POST
	},
	DeleteProject:{
		url:baseUrl+'/project',
		method:HTTPMETHOD.POST
	},
	AddMembers:{
		url:baseUrl+'/project/members',
		method:HTTPMETHOD.POST
	},
	DeleteMembers:{
		url:baseUrl+'/project/members',
		method:HTTPMETHOD.DELETE
	},
	AddResources:{
		url:baseUrl+'/project/resources',
		method:HTTPMETHOD.POST
	},
	DELETEResources:{
		url:baseUrl+'/project/resources',
		method:HTTPMETHOD.DELETE
	},
	GetProjectList:{
		url:baseUrl+'/projects/search?pageNumber={pageNumber}',
		method:HTTPMETHOD.POST
	},
	GetProjectDetail:{
		url:baseUrl+'/project/search'
		method:HTTPMETHOD.POST
	}
}

var getAPI=function(name){
	//TODO formate
	return _apiList[name];
}

export{

}