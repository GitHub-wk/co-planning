// upload.js
var express=require('express');
var router=express.Router();
const path=require('path');
const 
var formidable = require('formidable');
var STATUS=require('./CONSTANT.js').STATUS;

router.put('/upload',function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir="./resource";
	form.keepExtensions=true;
  	form.parse(req, function(err, fields, files) {
  		if(err)
  		{
  			res.json({msg:STATUS.UPLOAD_ERROR.lng,code:STATUS.UPLOAD_ERROR.code,status:STATUS.ERROR.code,data:null});
  			return false;
  		}
     	res.json({
     		msg:STATUS.UPLOAD_SUCCESS.lng,
     		data:{
     			url:path.basename(files.file.path),
     		},
     		code:STATUS.UPLOAD_SUCCESS.code,
     		status:STATUS.SUCCESS.code,
     	});
    });
});

module.exports=router;