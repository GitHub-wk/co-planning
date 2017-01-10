// upload.js
var express=require('express');
var router=express.Router();
var formidable = require('formidable');

router.put('/upload',function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir="./resource";
	form.keepExtensions=true;
  	form.parse(req, function(err, fields, files) {
     	res.json({msg:'上传成功'});
    });
});

module.exports=router;