//projectLayer.js
var projectModel = require('../model/projectModel');
var Q=require('q');

var projectLayer=function(){
	this.projects={};
}
projectLayer.prototype.getProjectById=function(projectId){
	if(!projectId){return null};
	return this.projects[projectId];
}
projectLayer.prototype.getProject=function(projectId,email){
	var defer=Q.defer();
	var scope=this;
	var project=this.projects[projectId];
	if(project)
	{
		if(project.members[email])
		{
			defer.resolve(project);
		}
		else{
			defer.reject({msg:'email not match project'});
		}
	}
	else{
		projectModel.findById(projectId,function(error,proj){
			if(error||!proj){
				defer.reject({msg:'error find data',data:null});
			}
			else{
				email===proj.leader?defer.resolve(scope._add(proj))
					:defer.reject({msg:'you should let leader login first',data:null});
			}
		})
	}
	return defer.promise;
}

projectLayer.prototype.removeProject=function(projectId){
	delete this.projects[projectId];
}

projectLayer.prototype.saveProjectDataToDataBase=function(projectId){
	var defer=Q.defer();
	var project=this.getProjectById(projectId);
	if(project)
	{
		projectModel.findByIdAndUpdate(projectId,{$set:{projectData:project.projectData}},function(error,project){
			if(error)
			{
				defer.reject({msg:'database operation error'});
			}
			else
			{
				defer.resolve({msg:'save projectData to database success'});
			}
		});
	}
	else{
		defer.reject({msg:'can not find project to save in projectLayer'});
	}
	return defer.promise;
}
projectLayer.prototype.removeMemberSocketId=function(projectId,socketId){
	if(!projectId||!socketId)
	{
		return null;
	}
	var project=this.projects[projectId];
	if(project)
	{
		var members=project.members;
		for(var memberId in members)
		{
			if(members[memberId].socketId===socketId)
			{
				members[memberId].socketId=null;
				return {leaveMember:memberId,project:project};
			}
		}
	}
	return null;
}

projectLayer.prototype.getMemberBySocketId=function(projectId,socketId){
	var project=this.getProjectById(projectId);
	if(project)
  	{
  		var members=project.members;
  		for(var memberId in members)
  		{
  			var member=project.members[memberId];
  			if(member.socketId&&member.socketId===socketId)
  			{
  				return member;
  			}
  		}
  	}
  	return null;
}

projectLayer.prototype.updateProjectData=function(projectId,projectData){
	var project=this.getProjectById(projectId);
	if(project){
		//TODO shuold not full copy;
		project.projectData=projectData;
	}
}
//init project
projectLayer.prototype._add=function(project){
	var proj=this.projects[project._id]={
		_version:0
	};
	proj.leader=project.leader;
	proj.projectData=project.projectData;
	proj.members={};
	proj.members[project.leader]={
		level:'rw',
		socketId:null,
	}
	for(var i=0;i<project.members.length;i++)
	{
		var memberId=project.members[i];
		proj.members[memberId]={
			lever:'r',
			socketId:null,
		}
	}
	console.log('add project to ProjectLayer:',project._id);
	return proj;
}

module.exports=new projectLayer();
