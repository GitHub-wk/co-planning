// DrawClose.component.js
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import {DRAWMODE} from './Draw.component.js';
import {message} from '../../plugin/plugin.js';

export default class DrawClose{
	constructor(ele)
	{
		this.element=ele;
	    this.fatherPan=null;
	    this.drawMode=DRAWMODE.CLOSE;
	    var clickFn=function(e){
	    	if(this.fatherPan)
	    	{
	    		//@for back-operation
				var opts=new THREE.Vector2();
				opts.copy(this.fatherPan.drawShape.currentPoint);
				var curves=this.fatherPan.drawShape.curves;
	    		if(curves.length>0)
	    		{
	    			if(curves.length===1&&curves[0] instanceof THREE.LineCurve)
	    			{
	    				message.error("a line can't close");
	    			}
	    			else{
				    		this.fatherPan.drawMode=DRAWMODE.OFF;
				    		this.fatherPan.drawShape.closePath();
				    		this.fatherPan.updateDrawMesh();
				    		this.putBackOperation(opts);
	    			}
	    		}
	    		else{
	    			message.error('no curve to close');
	    		}
	    	}
	    	DomEvent.stop(e);
	    }
	    DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}
	putBackOperation(opts){	
		if(this.fatherPan.backOperation)
		{			
			this.fatherPan.backOperation.push({obj:this,opts:opts});
		}
	}
	backDraw(opts){
		this.fatherPan.drawShape.moveTo(opts.x,opts.y);
		this.fatherPan.drawShape.curves.pop();
		this.fatherPan.updateDrawMesh();
	}
}
var drawCloseEle=DomUtil.createElement("div","path-close","<span>闭合</span>");
DrawClose.defaultInit=new DrawClose(drawCloseEle);
