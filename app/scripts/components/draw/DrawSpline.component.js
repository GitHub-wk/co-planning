// DrawSpline.component.js
import {DRAWMODE} from './Draw.component.js';
import {DomUtil,DomEvent,Util} from '../../core/core.js';

export default class DrawSpline{
	constructor(ele,intersectNames){
		this.element=ele;
		this.fatherPan=null;
		this.drawMode=DRAWMODE.SPLINE;
		this.intersectNames=intersectNames;
		var clickFn=function(e){
			if(this.fatherPan)
			{this.fatherPan.drawMode=this.drawMode;}
			DomEvent.stop(e);
		}
		DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}
	draw(intersects){
		var intersectNames=this.intersectNames||this.fatherPan.intersectNames;
		var intersect=intersects[0];
		if(intersect&&intersectNames[intersect.object.name])
		{
			var intersectPoint=intersect.point;			
			if(this.fatherPan.setStartPoint(intersectPoint))
			{
				//@for back-operation
				var opts=new THREE.Vector2();
				opts.copy(this.fatherPan.drawShape.currentPoint);
				var point2=new THREE.Vector2(intersectPoint.x,intersectPoint.y);
				// this.fatherPan.drawShape.lineTo(point2.x,point2.y);
				var curves=this.fatherPan.drawShape.curves;
				//if have splinecurve jast concat it
				if(curves[curves.length-1] instanceof THREE.SplineCurve)
				{
					curves[curves.length-1].points.push(point2);
					this.fatherPan.drawShape.moveTo(point2.x,point2.y);
				}
				else{
					this.fatherPan.drawShape.splineThru([point2]);
				}
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
			var curves=this.fatherPan.drawShape.curves;
			var splineCurve=curves[curves.length-1];
			this.fatherPan.drawShape.moveTo(opts.x,opts.y);
			splineCurve.points.pop();
			//if there only one point in splitcurve we can remove it;
			if(splineCurve.points.length===1)
			{
				curves.pop();
			}
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

var drawSplineEle=DomUtil.createElement("div","spline","<span>样条</span>")
DrawSpline.defaultInit=new DrawSpline(drawSplineEle,{'land':true});