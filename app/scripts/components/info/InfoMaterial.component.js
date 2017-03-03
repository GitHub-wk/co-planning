// InfoMaterial.component.js
import {DomUtil,Util,EventEmitter} from '../../core/core.js';
var UI=DomUtil.UI;
export default class InfoMaterial{
	constructor(){
		this.signal=new EventEmitter();
		this.element=DomUtil.createElement('div','info-material','');
		this.children=[];
	}
	addChild(child){
		child.containerEle=this.element;
		child.fatherComponent=this;
		this.children.push(child);
		return this;
	}
	removeChild(child){
		child.containerEle=null;
		child.fatherComponent=null;
		Util.removeByValue(this.children,child);
		return this;
	}
	refresh(intersects){
		var intersect=intersects[0];
		//if intersect===undefinded
		if(!intersect)
		{
			DomUtil.empty(this.element);
		}
		Util.forEach(this.children,function(child){
			child.execute(intersects);
		});
	}
}