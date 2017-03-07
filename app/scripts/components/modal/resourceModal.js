// resourceModal.js
// 
import { DomUtil, Util ,EventEmitter} from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';
import { addResourceModal } from './addResourceModal.js';
import { user, asynData, getLocalProjectId } from '../../dataservice/CommonDatabase.js';
import {imgFilter} from '../../dataservice/config.js';
import ko from 'knockout';
import axios from 'axios';
const RESOURCETYPE={
	"BUILDING":1,
	"GREEN":2,
	"MODAL":3,
	"TEXTURE":4,
}
var _resourceModal = null;
var resourceViewModal = {
	type:ko.observable(''),
	headerText:ko.observable(''),
    resourceList: ko.observableArray([]),
    imgFilter:imgFilter,
    loadResource: function(){   	
    },
    addResource: function(){
    	console.log('addddd');
    	addResourceModal.open({
    		type:resourceViewModal.type(),
    		callBack:function(resource){
    			_addResource(resource,resource.type);
    		}
    	})
    },
    removeResource:function(){
    	_removeResource(this,resourceViewModal.type());
    },
    closeModal: function(){
        _resourceModal.hide();
    }
}

BootstrapModal.fromTemplateUrl('/scripts/components/modal/resourceModal.html', { viewModel: resourceViewModal })
.then(function(modal){
    _resourceModal = modal;    
});

var resourceModal={};
resourceModal.open=function(opts={}){
	var type=opts.type;
	console.log(opts);
	resourceViewModal.resourceList([]);
	resourceViewModal.type(type);
	_refreshResource(type);
	switch(type){
		case RESOURCETYPE.BUILDING:
			resourceViewModal.headerText('建筑');
			break;
		case RESOURCETYPE.MODAL:
			resourceViewModal.headerText('模型');
			break;
		case RESOURCETYPE.TEXTURE:
			resourceViewModal.headerText('纹理');
			break;
		case RESOURCETYPE.GREEN:
			resourceViewModal.headerText('绿地');
			break;
		default:
			resourceViewModal.headerText('全部');			
	}
	resourceViewModal.loadResource=function(){
		var self=this;
		_resourceModal.hide();
		opts.callBack&&(opts.callBack(self));
	}
	_resourceModal.show();
}
function _refreshResource(type){
	var userData=user.getUser();
	var projectId=getLocalProjectId();
	asynData('GetProjectDetail',{
		email:userData.email,
		unionId:userData.unionId,
		projectId:projectId,
	},{type:type}).then(function(project){
		console.log(project);
 		resourceViewModal.resourceList(project.data.resources);
	})
}

function _addResource(resource,type){
	var userData=user.getUser();
	var projectId=getLocalProjectId();
	asynData('AddResources',{
		email:userData.email,
		unionId:userData.unionId,
		projectId:projectId,
		resources:[resource],
	}).then(function(){
		_refreshResource(type)
		console.log('addResource success');
	})
}

function _removeResource(resource,type){
	var userData=user.getUser();
	console.log(resource);
	var projectId=getLocalProjectId();
	asynData('DeleteResources',{
		email:userData.email,
		unionId:userData.unionId,
		projectId:projectId,
		resources:[{
			type:resource.type,
			url:resource.url,
			name:resource.name,
			faceImg:resource.faceImg,
		}],
	}).then(function(){
		_refreshResource(type);
		console.log('removeResource success');
	})
}

export { resourceModal,RESOURCETYPE};