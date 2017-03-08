import { DomUtil, Util, EventEmitter } from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';
import ko from 'knockout';
import axios from 'axios';
import { user, asynData, getLocalProjectId } from '../../dataservice/CommonDatabase.js';
import {BuildingStore} from '../../dataservice/WorldStore.js';
/**
 *{
		greenArea:greenArea,
		projectArea:projectArea,
		greenRatio:greenRatio,
		buildingArea:buildingArea,
		buildingDensity:buildingDensity,
		plotRatio:plotRatio
	}
 */
var analysisWorker=new Worker('/scripts/components/commonTool/analysisWorker.js');
var _houseFormModal = null,
    houseFormViewModal = {
    	greenArea:ko.observable(0),
    	projectArea:ko.observable(0),
    	greenRatio:ko.observable(0),
    	buildingArea:ko.observable(0),
    	buildingDensity:ko.observable(0),
    	plotRatio:ko.observable(0),
        closeModal:function(){
            _houseFormModal.hide();
        },
    };

BootstrapModal.fromTemplateUrl('/scripts/components/modal/houseFormModal.html', { viewModel: houseFormViewModal })
.then(function(modal){
    _houseFormModal = modal;   
})
var houseFormModal={};
houseFormModal.open=function(){
	var json=BuildingStore.toJson();
	var userData=user.getUser();
	var projectId=getLocalProjectId();
	asynData('GetProjectDetail',{
		email:userData.email,
		unionId:userData.unionId,
		projectId:projectId
	}).then(function(res){
		var project=res.data;
		analysisWorker.postMessage({
			projectArea:project.projectArea,
			greenArea:project.greenArea,
			buildingJSON:json,
		})
	})
	_houseFormModal.show();
}
analysisWorker.onmessage=function(message){
 	var reportTable=message.data;
 	houseFormViewModal.greenArea(reportTable.greenArea);
	houseFormViewModal.projectArea(reportTable.projectArea);
	houseFormViewModal.greenRatio(reportTable.greenRatio);
	houseFormViewModal.buildingArea(reportTable.buildingArea);
	houseFormViewModal.buildingDensity(reportTable.buildingDensity);
	houseFormViewModal.plotRatio(reportTable.plotRatio);
}

export { houseFormModal };
