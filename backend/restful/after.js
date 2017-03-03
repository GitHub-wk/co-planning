// after.js
var STATUS=require('./CONSTANT.js').STATUS;
function errorHandler(err, req, res, next) {
  res.json({msg:'has a error',data:err.message,status:STATUS.ERROR.code});
}

function notFoundHandler(req,res){
	res.json({msg:'not found',data:null,status:STATUS.ERROR.code});
}

module.exports={
	errorHandler:errorHandler,
	notFoundHandler:notFoundHandler
}