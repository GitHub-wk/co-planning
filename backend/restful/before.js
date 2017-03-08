// before.js
var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
const path = require('path');

//for post
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	next();
});
var options = {
	dotfiles: 'ignore',
	etag: true,
	maxAge: '10000',
	lastModified:true,
};
router.use(express.static(path.join(process.cwd(), 'public'),options));

module.exports=router;