// DrawSelect.component.js
//turn off father's drawMode
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import {DRAWMODE} from './Draw.component.js';
export default class DrawSelect{
	constructor(ele){
		this.element=ele;
		this.drawMode=DRAWMODE.SELECT;
		this.fatherPan=null;
		var clickFn=function(e){
			if(this.fatherPan){
				this.fatherPan.turnOffDrawMode();
			}
			DomEvent.stop(e);
		}
		DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}
}
var drawSelectEle=DomUtil.createElement("div","select","<span>选择</span>");
DrawSelect.defaultInit=new DrawSelect(drawSelectEle);