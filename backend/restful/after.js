// after.js
var path=require('path');
var cwd=require('process').cwd();
var STATUS=require('./CONSTANT.js').STATUS;
function errorHandler(err, req, res, next) {
  res.json({msg:'has a error',data:err.message,status:STATUS.ERROR.code});
}

function notFoundHandler(req,res){
	var url=req.url;
	var extname=path.extname(url);
	if(extname==='.jpg'||extname==='.png')
	{
		var options={
			root:path.join(cwd,'public/img/'),
		}
		var fileName='errorPic.jpg';
		res.sendFile(fileName, options, function (err) {
		    if (err) {
		      console.log(err);
		      res.status(err.status).end();
		    }});
	}
	else{res.json({msg:'not found',data:null,status:STATUS.ERROR.code});}	
}

module.exports={
	errorHandler:errorHandler,
	notFoundHandler:notFoundHandler
}