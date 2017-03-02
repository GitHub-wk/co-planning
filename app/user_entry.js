// user_entry.js
import {user,asynData} from './scripts/dataservice/CommonDatabase.js';
import axios from 'axios';
import {getAPI} from './scripts/dataservice/config.js';
import DomUtil from './scripts/core/DomUtil.js';
import DomEvent from './scripts/core/DomEvent.js';
import Util from './scripts/core/Util.js';

var projectLocalName='$$projectId';
var userData=user.getUserFromLocal();

asynData('GetProjectList',{email:userData.email,unionId:userData.unionId},{pageNumber:0})
.then(function(project){
	var projectList=project.data;
	console.log(project)
	var projectPanEl=DomUtil.getById('project-pan');
	DomUtil.empty(projectPanEl);
	for(var i=0;i<projectList.length;i++)
	{
		var projectItem=projectList[i];
		var projectEl=DomUtil.create('div','project-item',projectPanEl);
		projectEl.innerHTML='name:'+projectItem.name+';id:'+projectItem._id;
		var clickFn=function(){
			Util.storeData(projectLocalName,this._id);
			var location=window.location;
			location.href=location.origin+'/index.html';
		}
		DomEvent.on(projectEl,'click',Util.bind(clickFn,projectItem));
	}
	
},function(error){
	console.log(error);
});

console.log(userData);