// userLayer.js
var guid=require('../../utils/guid.js');


var userLayer=function(){
	this.users={};
}
userLayer.prototype.add=function (user) {
	this.remove(user);
	var unionId=guid();
	this.users[unionId]={
		userName:user.userName,
		email:user.email,
		unionId:unionId,
		faceImg:user.faceImg,
	};
	return this.users[unionId];
}
userLayer.prototype.remove=function(user){
	for(var unionId in this.users)
	{
		if(this.users[unionId]["email"]===user.email)
		{
			delete this.users[unionId];
		}
	}
}


module.exports=new userLayer();