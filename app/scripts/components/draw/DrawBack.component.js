// DrawBack.component.js
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import {DRAWMODE} from './Draw.component.js';

export default class DrawBack{
	constructor(ele)
	{
		this.element=ele;
	    this.fatherPan=null;
	    this.drawMode=DRAWMODE.BACK;
	    var clickFn=function(e){
	    	if(this.fatherPan)
	    	{
	    		var backOperation=this.fatherPan.backOperation.pop();
	    		if(backOperation)
	    		{backOperation.obj.backDraw(backOperation.opts);}
	    		else alert('has no operation to back');
	    	}
	    	DomEvent.stop(e);
	    }
	    DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}
}
var drawBackEle=DomUtil.createElement("div","back","<span>回退</span>");
DrawBack.defaultInit=new DrawBack(drawBackEle);