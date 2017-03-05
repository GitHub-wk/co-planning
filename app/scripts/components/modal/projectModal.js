// addProjectModal.js
import {BootstrapModal} from '../commonTool/modal.js';
import ko from 'knockout';
import {user,asynData} from '../../dataservice/CommonDatabase.js';
var _modal=null;
const MODEL={
	"ADD":{
		code:1,
		apiName:'CreatProject'
	},
	"EDIT":{
		code:2,
		apiName:'ModifyProject'
	},
}
var projectViewModel={
	headerText:ko.observable(''),
	name:ko.observable(''),
	projectArea:ko.observable(100),
	projectCenter:ko.observable(''),
	greenArea:ko.observable(30),
	closeFn:function(){
		_modal.hide();
	},
	clickFn:function(){
		_modal.hide();
	}
}
BootstrapModal.fromTemplateUrl('/scripts/components/modal/projectModal.html',{
	viewModel:projectViewModel
}).then(function(modal){
	_modal=modal;
})

var projectModal={}
projectModal.open=function(opts={},model){
	if(model.code===MODEL.ADD.code){
		opts.headerText='创建项目';
		opts.name='';
		opts.projectArea=100;
		opts.greenArea=30;
	}
	else{
		opts.headerText="修改项目";
	}
	projectViewModel.headerText(opts.headerText);
	projectViewModel.name(opts.name);
	projectViewModel.projectArea(opts.projectArea);
	projectViewModel.greenArea(opts.greenArea);
	projectViewModel.clickFn=function(flag){
		if(flag){
			var userData=user.getUser();
			asynData(model.apiName,{
				email:userData.email,
				unionId:userData.unionId,
				projectName:projectViewModel.name(),
				projectArea:projectViewModel.projectArea(),
				greenArea:projectViewModel.greenArea(),
				projectId:opts.projectId,
			}).then(function(project){
				opts.success(project);
				_modal.hide();
			},function(err){
				console.log(err);
				_modal.hide();
			});
		}
		else{
			_modal.hide();
		}
	}
	_modal.show();
}
export {
	projectModal,MODEL
}