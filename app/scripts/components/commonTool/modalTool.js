// modal.js
import {DomUtil,Util} from '../../core/core.js';
import {BootstrapModal} from './modal.js';
import ko from 'knockout';
//confirmModal
var confirmModal=null;
var confirmViewModal={
	headerText:ko.observable(''),
	contentText: ko.observable(''),
	closeFn:function(){
		confirmModal.hide();
	},
	clickFn:function(){
		confirmModal.hide();
	}
}
BootstrapModal.fromTemplateUrl('/scripts/components/commonTool/confirmModal.html',{viewModel:confirmViewModal})
.then(function(modal){
	confirmModal=modal;
	confirmModal.open=function(opts)
	{

		confirmViewModal.headerText(opts.header||'确认');
		confirmViewModal.contentText(opts.content||'内容');
		confirmViewModal.clickFn=function(flag){
			opts.callback&&(opts.callback(flag));
			confirmModal.hide();
		}
		confirmModal.show();
	}
	console.log(confirmModal);
});

//inputModal
//-----------------------------------------------
var inputModal=null;
var inputViewModal={
	headerText:ko.observable(''),
	inputText: ko.observable(''),
	closeFn:function(){
		inputModal.hide();
	},
	clickFn:function(){
		inputModal.hide();
	}
}
BootstrapModal.fromTemplateUrl('/scripts/components/commonTool/inputModal.html',{viewModel:inputViewModal})
.then(function(modal){
	inputModal=modal;
	inputModal.open=function(opts)
	{
		inputViewModal.headerText(opts.headerText||'确认');
		inputViewModal.inputText(opts.inputText||'');
		inputViewModal.clickFn=function(flag){
			opts.callback&&(opts.callback(flag,inputViewModal.inputText()));
			inputModal.hide();
		}
		inputModal.show();
	}
});
export{confirmModal,inputModal};
