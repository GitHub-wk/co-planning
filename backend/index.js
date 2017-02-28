// index.js
var restful=require('./restful/start.js');
var database=require('./database/start.js');
var socket=require('./socket/start.js');


database.start();
restful.start();
socket.start();