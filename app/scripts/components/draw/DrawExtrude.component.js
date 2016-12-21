// DrawExtrude.component.js
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import {DRAWMODE} from './Draw.component.js';
import * as THREE from 'threejs';
import {message} from '../../plugin/plugin.js';
import {createBuilding} from '../commonTool/buildingTool.js';
export default class DrawExtrude{
	constructor(ele)
	{
		this.element=ele;
	    this.fatherPan=null;
	    this.drawMode=DRAWMODE.EXTRUDE;
	    var clickFn=function(e){
	    	if(this.fatherPan)
	    	{
	    		var curves=this.fatherPan.drawShape.curves;
	    		if(curves.length>0)
	    		{
	    			if(curves.length===1&&curves[0] instanceof THREE.LineCurve)
	    			{
	    				message.error("a line can't build");
	    			}
	    			else{
				    		var building=this.draw();
	    					this.fatherPan.removeDrawMesh();
	    					this.fatherPan.reset();
	    					//hock for after draw,use this to save building data
	    					//can use signal 
	    					this._afterDraw&&this._afterDraw(building);
	    			}
	    		}
	    		else{
	    			message.error('no curve to build');
	    		}
	    	}	    	
	    	DomEvent.stop(e);
	    }
	    DomEvent.on(this.element,'click',Util.bind(clickFn,this));
	}
	draw(){
		var shape=this.fatherPan.drawShape;
		console.log(shape);
	    var buildingMesh = createBuilding(shape);
	    // TODO data-view not view-data
	    //this.fatherPan.drawMeshGroup.add(buildingMesh);
	    console.log(this.fatherPan._world.scene);
	    return buildingMesh;
	}
	setAfterDrawFunction(fn){
		this._afterDraw=fn;
	}
}
var drawExtrudeEle=DomUtil.createElement("div","extrude","<span>建楼</span>");
DrawExtrude.defaultInit=new DrawExtrude(drawExtrudeEle);