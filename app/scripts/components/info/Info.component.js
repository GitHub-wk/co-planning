// Info.component.js
import {Util,DomEvent,DomUtil} from '../../core/core.js';
import * as THREE from 'threejs';

var INFOSTATUS={
	'ON':"ON",
	'OFF':"OFF"
}
//TODO rebuild
export default class Info{
	constructor(element,world,intersectObjects){
		this.element=element;
		//build element
		this.children=[];
		this._intersectObjects=intersectObjects||[];
		this._raycaster = new THREE.Raycaster();
		this.turnONStatus();
		world&&this.resetWorld(world);
	}
	turnONStatus(){
		this.infoStatus=INFOSTATUS.ON;
		return this;
	}
	turnOFFStatus(){
		this.infoStatus=INFOSTATUS.OFF;
		return this;
	}
	addChild(child){
		this.children.push(child);
		return this;
	}
	removeChild(child){
		Util.removeByValue(this.children,child);
		return this;
	}
	resetWorld(world){
		this._world=world;	
		var canvas=this._world.renderer.domElement;
		var raycaster=this._raycaster;
		var camera=this._world.camera;
		var clickFn=function(event){			
        	if(this.infoStatus!==INFOSTATUS.OFF)
        	{
        		console.log('IN select mode');
        		var mouse=new THREE.Vector2(0,0);
        		var mousePosition=DomUtil.getMousePosition(canvas,event);
        		mouse.x = (mousePosition.left/ canvas.width) * 2 - 1;
    			mouse.y = -(mousePosition.top/canvas.height) * 2 + 1;
    			raycaster.setFromCameraHP(mouse, camera);
    			// bug when in long distance racaster have low precision
    			// var tempCamera=camera.clone();
    			// tempCamera.position.set(0,0,0);
    			// tempCamera.updateMatrixWorld(true);
    			// raycaster.setFromCamera(mouse, tempCamera);
    			// raycaster.ray.origin.copy(camera.position);
    			var intersects = raycaster.intersectObjects(this._intersectObjects,true);
				console.log(intersects)
        		this.refresh(intersects);			
        	}
        }
		DomEvent.on(canvas,'click',Util.bind(clickFn,this));
		return this;
	}
	refresh(intersects){
		if(this._world)
		{
    		//for other component communicate
			this._world.signal.emit('SELECT',intersects);		
		}
		Util.forEach(this.children,function(child){
    				// child.execute(intersects);
    				child.refresh&&child.refresh(intersects);
    			});
	}
	emptyIntersectObjects(ary){
		Util.emptyArray(this._intersectObjects);
		if(ary)
		{
			for(var i=0;i<ary.length;i++)
			{
				this.addIntersectObject(ary[i]);
			}
		}
		return this;
	}
	addIntersectObject(intersectObject)
	{
		this._intersectObjects.push(intersectObject);
	    return this;
	}
}