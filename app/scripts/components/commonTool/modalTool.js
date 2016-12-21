// modal.js
import {DomUtil,Util} from '../../core/core.js';

require('./confirmModal.less');
var UI=DomUtil.UI;
class ConfirmModal{
	constructor(){
		this.modal=new UI.Modal();
		this.modal.setPosition('fixed').setClass('modal');
		this.modal.container.setWidth('300px');
		DomUtil.appendChild(document.body,this.modal.dom);
		this.confirm=new UI.Div().setClass('confirm-modal');

		this.confirmHeader=new UI.Div().setClass('confirm-header');
		this.confirmBody=new UI.Div().setClass('confirm-body');
		this.confirmFooter=new UI.Div().setClass('confirm-footer');
		this.headerText=new DomUtil.create('h2','header',this.confirmHeader.dom);
		this.bodyText=new DomUtil.create('p','body',this.confirmBody.dom);
		var scope=this;
		var cancelButton=new UI.Button('取消').setClass('button-cancel').onClick(function(){scope.confirmFn(false);});
		var confirmButton=new UI.Button('确认').setClass('button-confirm').onClick(function(){scope.confirmFn(true)});
		this.confirmFooter.add(cancelButton,confirmButton);
	}
	show(opts)
	{
		this.confirm.clear();
		if(opts.header)
		{
			this.headerText.innerHTML=opts.header;
			this.confirm.add(this.confirmHeader);
		}
		if(opts.content)
		{			
			this.bodyText.innerHTML=opts.content;
			this.confirm.add(this.confirmBody);
		}
		this.confirm.add(this.confirmFooter);
		this.confirmFn=opts.callback||Util.falseFn;
		this.modal.show(this.confirm);
	}
}
var confirmModal=new ConfirmModal();

export{confirmModal};
