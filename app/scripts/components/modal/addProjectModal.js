// addProjectModal.js
import {BootstrapModal} from '../commonTool/modal.js';
var _modal=null;
var addProjectViewModel={
	
}
BootstrapModal.fromTemplateUrl('/scripts/components/modal/addProjectModal.html',{
	viewModel:addProjectViewModel
}).then(function(modal){
	_modal=modal;
})

var addProjectModal={}
addProjectModal.open=function(){
	_modal.show();
}
export {
	addProjectModal
}