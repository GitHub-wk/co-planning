//project

var express = require('express');
var router = express.Router();
var projectModel = require('../database/model/projectModel');
var userLayer = require('../database/layers/userLayer.js');
//body:userName:,unionId:,projectName
router.post('/project', function (req, res) {
    var email = req.body.email;
    var unionId = req.body.unionId;
    var projectName = req.body.projectName;
    var user = userLayer.auth(email, unionId);
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
                back = { msg: '保存出错', data: null, code: STATUS.ERROR.code };
            }
            else {
                back = { msg: '创建成功', data: project, code: STATUS.SUCCESS.code };
                console.log('创建成功', project.name);
            }
            res.json(back);
        });
    }
    else {
        back = {
            msg: STATUS.AUTH_ERROR.lng, data: null, code:STATUS.AUTH_ERROR.code,
        }
        res.json(back);
    }
});

router.delete('/project', function (req, res) {
    var userName = req.body.email;
    var unionId = req.body.unionId;
    var projectId = req.body.projectId;
    var user = userLayer.auth(email, unionId);
    var back = null;
    if(user){
        
    }
    else {
        back = {
            msg: STATUS.AUTH_ERROR.lng, data: null, code:STATUS.AUTH_ERROR.code,
        }
        res.json(back);
    }
});






module.exports = router;