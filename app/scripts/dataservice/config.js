// config.js
/**
 * @author  wk
 * @date 2016/11/28
 * @description public config
 */
import Util from '../core/Util.js';

var HTTPMETHOD={
	"GET":'get',
	"POST":'post',
	"PUT":'put',
	"DELETE":'delete'
}
var socketUrl='ws://172.16.102.186:3000';

var baseUrl="http://172.16.102.186:8082";
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
		url:baseUrl+'/project/search',
		method:HTTPMETHOD.POST
	}
}

var getAPI=function(name,urlFormat){
	//TODO formate
	var api=_apiList[name];
	if(urlFormat&&api)
	{
		//deepCopy TODO
		return{
			url:Util.template(api.url,urlFormat),
			method:api.method,
		}
	}
	return _apiList[name];
}

export{
	getAPI,
	socketUrl,
}