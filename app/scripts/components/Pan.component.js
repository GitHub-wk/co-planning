// DraggabelPan.component.js
import {Draggable,DomUtil} from '../core/core.js';
/**
 * @class class to init a pan can Drag;
 */
export default class Pan{
	constructor(ele){
		this.element=ele;
	}
	addChild(childEle){
		DomUtil.appendElement(this.element,childEle);
	}
	removeChild(childEle)
	{
		DomUtil.remove(childEle);
	}
}