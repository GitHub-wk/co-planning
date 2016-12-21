// DrawExit.js
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import {DRAWMODE} from './Draw.component.js';

export default class DrawExit{
	constructor(ele)
	{
		this.element=ele;
	    this.fatherPan=null;
	    this.drawMode=DRAWMODE.EXIT;
	    var clickFn=function(e){
	    	if(this.fatherPan)
	    	{
	    		this.fatherPan.reset();
	    	}
	    	DomEvent.stop(e);
	    }
	    DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}
}
var drawExitEle=DomUtil.createElement("div","exit","<span>退出</span>");
DrawExit.defaultInit=new DrawExit(drawExitEle);