// Layer.js
import {Util} from '../../core/core.js';

export class Layer{
	constructor(object,name){
		this.object=object;
		this.name=name;
		this.selectable=true;
		this.deleteable=true;
		this.clearable=true;
		this.selected=false;
		return this;
	}
	add(object)
	{
		if(this.object)
		{this.object.add(object);}
	}
	remove(object)
	{
		if(this.object)
		{
			this.object.remove(object);
		}
	}
	setSelectable(flag)
	{
		this.selectable=flag;
		return this;
	}
	setDeleteable(flag)
	{
		this.deleteable=flag;
		return this;
	}
	setClearable(flag){
		this.clearable=flag;
		return this;
	}
	clear(){
		if(this.object)
		{
			Util.emptyArray(this.object.children);
			return true;
		}
		return false;
	}
	toggleVisible(){
		if(this.object)
		{
			this.object.visible=!this.object.visible;
			return this.object.visible;
		}
		return false;
	}
}
