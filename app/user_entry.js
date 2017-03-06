// user_entry.js
import './css/user.less';
import {user,asynData} from './scripts/dataservice/CommonDatabase.js';
import {getUrl} from './scripts/dataservice/config.js';
import axios from 'axios';
import ko from 'knockout';
import {getAPI} from './scripts/dataservice/config.js';
import DomUtil from './scripts/core/DomUtil.js';
import DomEvent from './scripts/core/DomEvent.js';
import Util from './scripts/core/Util.js';
import {parseFromUrl} from './scripts/components/partial/partial.js';
import {inputModal,confirmModal} from './scripts/components/commonTool/modalTool.js';
import {projectModal,MODEL} from './scripts/components/modal/projectModal.js'
var projectLocalName='$$projectId';
var userData=user.getUserFromLocal();
console.log(userData);

//userinfo view
function UserInfoViewModel(){
	var self=this;
	self.userName=ko.observable(userData.userName);
	self.imgUrl=ko.observable(userData.faceImg),
	self.faceImg=ko.computed(function(){
		var imgUrl=self.imgUrl()||'noPic.jpg';
		return getUrl('img')+imgUrl;
	})
	self.email=userData.email;
}
parseFromUrl('/scripts/components/partial/userInfo.html',new UserInfoViewModel(),DomUtil.getById('user-info'));


//projectLis view
var projectListViewModel={
	projectList:ko.observableArray([]),
	joinedId:ko.observable(''),
	joinProject:function(){
		projectListViewModel.goProject(this._id);
		console.log(this);
	},
	removeMember:function(){
		console.log('removeMember');
		var self=this;
		inputModal.open({
			headerText:'请输入要移除成员的账号',
			callback:function(flag,member){
				if(flag&&member)
				{
					asynData('DeleteMembers',{
						email:userData.email,
						unionId:userData.unionId,
						projectId:self._id,
						members:[member],
					}).then(function(){
						refreshProjectList();
					});
				}
			}
		});
	},
	addMember:function(){
		console.log('addMember');
		var self=this;
		inputModal.open({
			headerText:'请输入要增加的成员的账号',
			callback:function(flag,member){
				if(flag&&member)
				{
					asynData('AddMembers',{
						email:userData.email,
						unionId:userData.unionId,
						projectId:self._id,
						members:[member],
					}).then(function(){
						refreshProjectList();
					});
				}
			}
		});
	},
	goProject:function(projectId){
		console.log('go');
		if(projectId)
		{
			Util.storeData(projectLocalName,projectId);
			var location=window.location;
			window.open(location.origin+'/co_planning.html');
			return true;
		}
		else{
			alert('请先在输入框填写项目id！');
			return false;
		}
	},
	addProject:function(){
		projectModal.open({
			success:function(project){
				console.log(project);
				refreshProjectList();
			}
		},MODEL.ADD);
	},
	removeProject:function(){
		var self=this;
		confirmModal.open({
			header:'警告！',
			content:'确认删除该项目：'+self.name+'?',
			callback:function(flag)
			{
				if(flag)
				{
					asynData('DeleteProject',{
						email:userData.email,
						unionId:userData.unionId,
						projectId:self._id,
					}).then(function(){
						refreshProjectList();
					});
				}
			}
		});		
	},
	modifyProject:function(){
		var self=this;
		projectModal.open({
			name:self.name,
			projectArea:self.projectArea,
			greenArea:self.greenArea,
			projectId:self._id,
			success:function(project){
				console.log(project);
				refreshProjectList();
			}
		},MODEL.EDIT);
	}
}
parseFromUrl('/scripts/components/partial/projectList.html',projectListViewModel,DomUtil.getById('project-pan'));
refreshProjectList();
function refreshProjectList(){
	asynData('GetProjectList',{email:userData.email,unionId:userData.unionId},{pageNumber:0})
	.then(function(project){
		var projectList=project.data;	
		projectListViewModel.projectList(projectList);	
	},function(error){
		console.log(error);
	});
}
