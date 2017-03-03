// InfoMaterial.component.js
import {DomUtil,Util} from '../../core/core.js';
var UI=DomUtil.UI;
export default class InfoMaterial{
	constructor(){
		this.element=DomUtil.createElement('div','info-material','');
		this.children=[];
	}
	addChild(child){
		child.containerEle=this.element;
		this.children.push(child);
		return this;
	}
	removeChild(child){
		child.containerEle=null;
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