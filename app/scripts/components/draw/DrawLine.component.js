// DrawLine.component.js
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import {DRAWMODE} from './Draw.component.js';

export default class DrawLine{
	constructor(ele,intersectNames){		
		this.element=ele;
        this.fatherPan=null;
        this.intersectNames=intersectNames;
        this.drawMode=DRAWMODE.LINE;
        var clickFn=function(e){
        	if(this.fatherPan){
        		console.log('click');
        		this.fatherPan.drawMode=this.drawMode;
        	}
        	// console.log(e);
        	DomEvent.stop(e);
        };
        DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}

	draw(intersects){
		//console.log(intersects);
		var intersectNames=this.intersectNames||this.fatherPan.intersectNames;
		var intersect=intersects[0];
		if(intersect&&intersectNames[intersect.object.name])
		{
			/**
			 * TODO
			 * shape can only draw 2d,so we ignore z-cordinate
			 * this cause intersect can only be the ground which z-cordinate is 0;
			 * if have time ,should make it support 3d;
			 */
			var intersectPoint=intersect.point;
			//can use command model to write it;			
			if(this.fatherPan.setStartPoint(intersectPoint))
			{
				//@for back-operation
				var opts=new THREE.Vector2();
				opts.copy(this.fatherPan.drawShape.currentPoint);
				var point2=new THREE.Vector2(intersectPoint.x,intersectPoint.y);
				this.fatherPan.drawShape.lineTo(point2.x,point2.y);
				this.fatherPan.updateDrawMesh();
				//@ put into father backoperation stack
				this.putBackOperation(opts);
			}
			else{
				this.fatherPan.updateDrawMesh();
				this.putBackOperation();
			}	
		}
	}
	putBackOperation(opts){	
		if(this.fatherPan.backOperation)
		{			
			this.fatherPan.backOperation.push({obj:this,opts:opts});
		}
	}

	backDraw(opts){
		if(opts)
		{
			this.fatherPan.drawShape.moveTo(opts.x,opts.y);
			this.fatherPan.drawShape.curves.pop();		
		}
		else {
			this.fatherPan.drawShape._setStartPoint=false;
		}
		this.fatherPan.updateDrawMesh();
	}
	setIntersectNamaes(intersectNames){
		this.intersectNames=intersectNames;
	}
}
var drawLineEle=DomUtil.createElement("div","line","<span>线</span>")
DrawLine.defaultInit=new DrawLine(drawLineEle,{'land':true});