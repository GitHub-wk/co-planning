// modal.js
import {DomUtil,Util,EventEmitter,Promise} from '../../core/core.js';
import './modal.less';
import ko from 'knockout';
import axios from 'axios';
export class BootstrapModal{
	constructor(content){
		this.dom=content;
		this.signal=new EventEmitter();
		DomUtil.appendChild(document.body,this.dom);
	}
	show(content){
		DomUtil.addClass(this.dom,'in');
		DomUtil.setStyle(this.dom,'display','block');
		this.signal.emit('modal.show');
	}
	hide(){
		DomUtil.removeClass(this.dom,'in');
		DomUtil.setStyle(this.dom,'display','none');
		this.signal.emit('modal.hide');
	}
	remove(){
		DomUtil.remove(this.dom);
		this.signal.emit('modal.remove');
	}
}
BootstrapModal.createModal=function(html,viewModel)
{
	var dom=DomUtil.parseDom(html);
	ko.applyBindings(viewModel||{},dom);
	return new BootstrapModal(dom);
}
BootstrapModal.fromTemplateUrl=function(url,options){
	return axios.get(url).then(function(res){
		var html=res.data;
		var _modal=null;
		try{
			_modal=BootstrapModal.createModal(html,options.viewModel)
		}
		catch(err){
			console.log(err);
			throw new Error('bind error');
		}
		return _modal;
	},function(error){
	 throw new Error('not found:'+url);
	});
}
BootstrapModal.fromTemplate=function(html,options){
	return new Promise(function(resolve){
		var _modal=null;
		try{
			_modal=BootstrapModal.createModal(html,options.viewModel)
		}
		catch(err){
			throw new Error('bind error');
		}
		return _modal;
	});
}


