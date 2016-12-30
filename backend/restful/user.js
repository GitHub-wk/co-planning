//user.js
var express=require('express');
var router=express.Router();
var userLogin = require('../database/command/userLogin.js');
var userRegister = require('../database/command/userRegister.js');
var userLogout = require('../database/command/userLogout.js');
//registe restful
router.post('/user/register',function(req,res){
    userRegister(req.body)
    .then(function (data) { 
        res.json(data);
    }, function (error) { 
        res.json(error);
    })
});

//login restful
router.post('/user/login',function(req,res){
    userLogin(req.body)
    .then(function (data) { 
        res.json(data)
    }, function (error) {
        res.json(error);
    })
});
//logout restful
router.post('/user/logout', function (req, res) {
    userLogout(req.body)
   .then(function (data) {
        res.json(data);
    }, function (error) { 
        res.json(error);
    })
});

module.exports=router;