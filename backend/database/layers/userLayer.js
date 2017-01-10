// userLayer.js
var guid=require('../../utils/guid.js');


var userLayer=function(){
	this.users={};
}
userLayer.prototype.add=function (user) {
	this._remove(user);
	var unionId=guid();
	this.users[unionId]={
		userName:user.userName,
		email:user.email,
		unionId:unionId,
        faceImg: user.faceImg,
	};
	return this.users[unionId];
}
userLayer.prototype._remove=function(user){
	for(var unionId in this.users)
	{
		if(this.users[unionId]["email"]===user.email)
		{
			delete this.users[unionId];
		}
	}
}
userLayer.prototype.logout=function (email,unionId) {
	var user=this.users[unionId];
	if(user&&user.email===email)
	{
		delete this.users[unionId];
		return true;
	}
	return false;
}
userLayer.prototype.auth = function (email,unionId) {
	if(!email||!unionId)
		return false;
    var user = this.users[unionId];
    if (user && user.email === email) { 
        return user;
    }
    return false;
}


module.exports=new userLayer();