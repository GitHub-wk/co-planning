// start.js
var mongoose=require('mongoose');


var start=function(databaseName){
	var databaseName='co-planning'||databaseName;
	mongoose.connect('mongodb://wk:19920910wk@localhost/'+databaseName);
	var db=mongoose.connection;
    db.on('error', function (){
        console.log('error connect');
    });
	db.on('open',function(){console.log('connect to database：'+databaseName)});
	return db;
}

module.exports={
	start:start,
}