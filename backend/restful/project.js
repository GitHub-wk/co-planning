//project

var express = require('express');
var router = express.Router();
var projectModel = require('../database/model/projectModel');
var userLayer = require('../database/layers/userLayer.js');
var STATUS=require('./CONSTANT.js').STATUS;
//body:userName:,unionId:,projectName
//project api should first test user auth;
router.use(['/project','/projects'],function(req,res,next){
    var email = req.body.email;
    var unionId = req.body.unionId;
    var user = userLayer.auth(email, unionId);
    if(user){
        next();
    }
    else{
        back = {
            msg: STATUS.AUTH_ERROR.lng, data: null, code:STATUS.AUTH_ERROR.code,status:STATUS.ERROR.code
        }
        res.json(back);
    }
});

//add project
router.post('/project', function (req, res) {
    var email = req.body.email;
    var projectName = req.body.projectName;
    var back = null;
    var project = new projectModel({
        name: projectName,
        leader: email,
        resources: [],
        members: [],
    });
    project.save(function (error, project) {
        if (error) {
            back = { msg: '保存出错', data: null, code: STATUS.ERROR.code ,status:STATUS.ERROR.code};
        }
        else {
            back = { msg: '创建成功', data: project, code: STATUS.SUCCESS.code ,status:STATUS.SUCCESS.code};
            console.log('创建成功', project.name);
        }
        res.json(back);
    });
    
});

//delete project
router.delete('/project', function (req, res) {
    var email = req.body.email;
    var projectId = req.body.projectId;
    var back = null;
    projectModel.remove({_id:projectId,leader:email},function(error,project){
        if(error)
        {
            back={msg:'删除项目出错',data:null,code:STATUS.ERROR.code,status:STATUS.ERROR.code};
        }
        else{

            back={msg:'删除项目成功',data:project,code:STATUS.SUCCESS.code,status:STATUS.SUCCESS.code};
        }
        res.json(back);
    })
});

//add members to project
router.post('/project/members',function(req,res){
    var email=req.body.email;
    var projectId=req.body.projectId;
    console.log(req.body.members);
    var members=req.body.members;
    var back=null;
    projectModel.findOneAndUpdate({_id:projectId,leader:email},{
    '$addToSet':{
        "members":{"$each":members}
    }},function(error,project){
        if(error)
        {
            console.log(error);
            back={msg:'添加成员出错',data:null,code:STATUS.ERROR.code,status:STATUS.ERROR.code};
        }
        else{

            back={msg:'添加成员成功',data:project,code:STATUS.SUCCESS.code,status:STATUS.SUCCESS.code};
        }
        res.json(back);
    });
});

//remove members
router.delete('/project/members',function(req,res){
    var email=req.body.email;
    var projectId=req.body.projectId;
    var members=req.body.members;
    var back=null;
    projectModel.findOneAndUpdate({_id:projectId,leader:email},{
    '$pullAll':{
        "members":members
    }},function(error,project){
        if(error)
        {
            back={msg:'移除成员出错',data:null,code:STATUS.ERROR.code,status:STATUS.ERROR.code};
        }
        else{

            back={msg:'移除成员成功',data:project,code:STATUS.SUCCESS.code,status:STATUS.SUCCESS.code};
        }
        res.json(back);
    });
});

//add resources to project
//TODO remove file to diffrent dir
router.post('/project/resources',function(req,res){
    var email=req.body.email;
    var projectId=req.body.projectId;
    var resources=req.body.resources;
       projectModel.findOneAndUpdate({_id:projectId,leader:email},{
        '$addToSet':{
            "resources":{"$each":resources}
        }},function(error,project){
            if(error)
            {
                back={msg:'添加资源出错',data:null,code:STATUS.ERROR.code,status:STATUS.ERROR.code};
            }
            else{

                back={msg:'添加资源成功',data:project,code:STATUS.SUCCESS.code,status:STATUS.SUCCESS.code};
            }
            res.json(back);
        });
});

//remove resources to project
router.delete('/project/resources',function(req,res){
    var email=req.body.email;
    var projectId=req.body.projectId;
    var resources=req.body.resources;
    projectModel.findOneAndUpdate({_id:projectId,leader:email},{
        '$pullAll':{
        "resources":resources
    }},function(error,project){
        if(error)
        {
            back={msg:'移除资源出错',data:null,code:STATUS.ERROR.code,status:STATUS.ERROR.code};
        }
        else{

            back={msg:'移除资源成功',data:project,code:STATUS.SUCCESS.code,status:STATUS.SUCCESS.code};
        }
        res.json(back);
    });
});

//get project list 5
router.post('/projects/search',function(req,res){
    var email=req.body.email;
    var pageNmber=req.query.pageNumber;
    var back=null;
    projectModel.find({leader:email},null,{skip:5*pageNmber,limit:5},function(error,projects){
        if(error)
        {
            back={msg:'获取项目列表出错',data:null,code:STATUS.ERROR.code,status:STATUS.ERROR.code};
        }
        else{

            back={msg:'获取项目列表成功',data:projects,code:STATUS.SUCCESS.code,status:STATUS.SUCCESS.code};
        }
        res.json(back);
    });
});

router.post('/project/search',function(req,res){
    var email=req.body.email;
    var projectId=req.body.projectId;
    var type=req.query.type;
    var back=null;
    projectModel.findOne({_id:projectId,leader:email},function(error,project){
        if(error&&!project)
        {
            back={msg:'获取项目详情失败',data:null,code:STATUS.ERROR.code,status:STATUS.ERROR.code};
        }
        else{
            //this api can not get projectData;
            delete project.projectData;
            if(type!==undefined)
            {
                var projectResources=project.resources;
                var chooseResources=[];
                for(var i=0;i<projectResources.length;i++)
                {
                    if(projectResources[i].type===type)
                    {
                        chooseResources.push(projectResources[i]);                           
                    }
                }
                project.resources=chooseResources;
            }
            back={msg:'获取项目详情成功',data:project,code:STATUS.SUCCESS.code,status:STATUS.SUCCESS.code};
        }
        res.json(back);
    });
})

module.exports = router;