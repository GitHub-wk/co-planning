//project

var express = require('express');
var router = express.Router();
var projectModel = require('../database/model/projectModel');
var userLayer = require('../database/layers/userLayer.js');
//body:userName:,unionId:,projectName
router.post('/createProject', function (req, res) {
    var userName = req.body.userName;
    var unionId = req.body.unionId;
    var projectName = req.body.projectName;
    var user = userLayer.auth(userName, unionId);
    var back = null;
    if (user) {
        var project = new projectModel({
            name: projectName,
            leader: user.email,
            resources: [],
            members: [],
        });
        project.save(function (error, project) {
            if (error) {
                back = { msg: '保存出错', data: null, code: 14 };
            }
            else {
                back = { msg: '创建成功', data: project, code: 15 };
                console.log('创建成功', project.name);
            }
            res.json(back);
        });
    }
    else {
        back = {
            msg: '验证错误', data: null, code: 03,
        }
        res.json(back);
    }
});

router.post('/deleteProject', function (req, res) {
    var userName = req.body.userName;
    var unionId = req.body.unionId;
    var projectId = req.body._id;
   
});






module.exports = router;