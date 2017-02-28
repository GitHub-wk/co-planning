// start.js
var server = require('http').createServer();
var io = require('socket.io')(server);
var userLayer = require('../database/layers/userLayer.js');
var projectLayer=require('../database/layers/projectLayer.js');
var connectCount=0;
io.on('connection', function(client){
  console.log('has connetion:',++connectCount);
	//member login leader should first login
  client.on('login', function(data){
  	var user=userLayer.auth(data.email,data.unionId);
  	if(!user||!data.projectId){
  		client.emit('login',{msg:'登入失败'});
  		return false;
  	}
  	projectLayer.getProject(data.projectId,data.email).then(function(project){
  		project.members[data.email].socketId=client.id;
  		client.projectId=data.projectId;
  		client.emit('login',{msg:'获取成功',data:project,});

      //tell other members
      for(var memberId in project.members)
      {
        var member=project.members[memberId];
        if(member.socketId&&member.socketId!==client.id)
        {
          io.sockets.sockets[member.socketId].emit('memberChange',{
            msg:'成员加入:'+data.email,
            data:project.members});
        }
      }
  	},function(error){
  		client.emit('login',error);
  	});
  });


  //if leader disconnect delete project
  client.on('disconnect', function(){
    console.log('leave a connect:',--connectCount);
  	var disconnect=projectLayer.removeMemberSocketId(client.projectId,client.id);
  	if(!disconnect){
  		return false;
  	}
  	//emit to other member leave message
  	var project=disconnect.project;
  	for(var memberId in project.members)
  	{
  		var member=project.members[memberId];
  		if(member.socketId&&member.socketId!==client.id)
  		{
  			io.sockets.sockets[member.socketId].emit('memberChange',{
  				msg:'成员离开:'+disconnect.leaveMember,
  				data:project.members});
  		}
  	}
  	//if leader leave we remove project for layer
    // add save projectData to database
    // TODO
  	if(project.leader===disconnect.leaveMember)
  	{
      projectLayer.saveProjectDataToDataBase(client.projectId);
  		projectLayer.removeProject(client.projectId);
  	}
  });


  //refresh data (two modal)
  client.on('refresh',function(projectData){
  	var member=projetLayer.getMemberBySocketId(client.projectId,client.socketId);
  	var project=projectLayer.getProjectById(client.projectId);
  	if(member&&project&&member.level==='r')
  	{
  		client.emit('refresh',{msg:'数据更新',data:project.projectData});
  	}
  	if(member&&project&&member.level==='rw')
  	{
  		projectLayer.updateProjectData(client.projectId,projectData);
  		client.emit('refresh',{msg:'数据已上传更新',data:null});
  		for(var memberId in project.members)
	  	{
	  		var otherMember=project.members[memberId];
	  		if(otherMember.socketId&&otherMember.socketId!==client.id)
	  		{
	  			io.sockets.sockets[otherMember.socketId].emit('refresh',{
	  				msg:"数据更新",
	  				data:project.projectData});
	  		}
	  	}
  	} 	
  });


  //auth to members 'rw'
  client.on('auth',function(){
    
  });
});


var start=function(port){
	var port=port||3000
	server.listen(3000);
	console.log('socket.io started on :'+port);
}

module.exports={
	start:start
}