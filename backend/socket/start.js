// start.js
var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){
  client.on('login', function(data){
  	console.log(data);
  });
  client.on('message', function(data){
  	console.log(data);
  });
  client.on('disconnect', function(){
  	
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