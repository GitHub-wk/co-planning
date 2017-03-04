// modal.js
import {DomUtil,Util} from '../../core/core.js';
import {BootstrapModal} from './modal.js';
import ko from 'knockout';
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


export{confirmModal};
