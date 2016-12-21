// DrawClear.component.js
import {DRAWMODE} from './Draw.component.js';
import {DomEvent,Util,DomUtil} from '../../core/core.js';

/**
 * @class clearcomponent to clear father.drawMesh and father.drawShape father.backOperation
 */
export default class DrawClear{
	constructor(ele){
		this.fatherPan=null;
		this.element=ele;
		this.drawMode=DRAWMODE.CLEAR;
		var clickFn=function(e){
			if(this.fatherPan)
			{
				Util.emptyArray(this.fatherPan.backOperation);
				Util.emptyArray(this.fatherPan.drawShape.curves);
        		this.fatherPan.drawShape._setStartPoint=false;
        		this.fatherPan.updateDrawMesh();
			}
			DomEvent.stop(e);
		}
		DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}
}
var drawClearEle=DomUtil.createElement("div","clear","<span>清除</span>");
DrawClear.defaultInit=new DrawClear(drawClearEle);