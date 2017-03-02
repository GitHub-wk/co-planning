// user_entry.js
import {user,asynData} from './scripts/dataservice/CommonDatabase.js';
import axios from 'axios';
import {getAPI} from './scripts/dataservice/config.js';
import DomUtil from './scripts/core/DomUtil.js';
import DomEvent from './scripts/core/DomEvent.js';
import Util from './scripts/core/Util.js';

var projectLocalName='$$projectId';
var userData=user.getUserFromLocal();
var goProjectEl=DomUtil.getById('go-project');
DomEvent.on(goProjectEl,'click',function(){
	var projectIdEl=DomUtil.getById('joinedId');
	var projectId=projectIdEl.value;
	console.log(projectId);
	goProject(projectId);
})

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
			goProject(this._id);
		}
		DomEvent.on(projectEl,'click',Util.bind(clickFn,projectItem));
	}
	
},function(error){
	console.log(error);
});


function goProject(projectId){
	if(projectId)
	{
		Util.storeData(projectLocalName,projectId);
		var location=window.location;
		location.href=location.origin+'/co_planning.html';
		return true;
	}
	else{return false;}
}

console.log(userData);