// cameraControl.js
import {DomEvent} from '../core/core.js';
import * as THREE from 'threejs';
function cameraControl(object,dom){
	this.domElement=dom;
	this.camera=object;
	this.tempCamera=this.camera.clone();
	var scope=this;
	var STATE={'OFF':1,'ROLATE':2,'PAN':3};
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
	var mouseState=STATE.OFF;
	var quaternion=this.camera.quaternion.clone();
	var rotate={x:0,y:0};
	this.mouseButtons = { OR: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
	var mousedownFn=function(event){
		if(event.button === THREE.MOUSE.LEFT){
			mouseState=STATE.ROLATE;		
		}
		else if(event.button===THREE.MOUSE.RIGHT){
			mouseState=STATE.PAN;
		}
	}
	var mousemoveFn=function(event){
		if(Math.pow(event.movementX,2)+Math.pow(event.movementY,2)<2)
		{
			return false;
		}
		if(mouseState===STATE.PAN)
		{
			pan(event.movementX,event.movementY);
		}
		else if(mouseState===STATE.ROLATE)
		{
			var deltX=Math.PI/2*event.movementX/scope.domElement.width;
			var deltY=Math.PI/2*event.movementY/scope.domElement.height;
			rotate.x+=deltX;
			rotate.y+=deltY;
			var xquaternion = new THREE.Quaternion();
			xquaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ),rotate.y);
			var yquaternion = new THREE.Quaternion();
			yquaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ),rotate.x);
			var requaternion = new THREE.Quaternion();
			scope.camera.quaternion.copy(requaternion.multiply(quaternion).multiply(xquaternion).multiply(yquaternion));
			// scope.camera.rotateX(deltY);
			// scope.camera.rotateY(deltX);
			scope.camera.updateMatrixWorld(true);			
		}
	}
	var mouseupFn=function(e){
		mouseState=STATE.OFF;
	}
	var contextmenuFn=function(event){
		DomEvent.preventDefault(event);
	}
	var wheelFn=function(event) {
		var position=scope.camera.position;
		if (event.deltaY < 0) {

            position.setZ(position.z/2);

        } else if (event.deltaY > 0) {

            position.setZ(position.z*2);

        }		
		scope.camera.updateMatrixWorld(true);
	}
	var keydownFn=function(event) {
		console.log(event);
		 switch (event.keyCode) {
            case scope.keys.UP:
                pan(0, 10);
                console.log('up')
                break;

            case scope.keys.BOTTOM:
                pan(0, -10);
                break;

            case scope.keys.LEFT:
                pan(10, 0);
                break;

            case scope.keys.RIGHT:
                pan(-10, 0);
                break;
        }
	}
	function pan(moveX,moveY){
		var deltX=scope.camera.position.z*moveX/scope.domElement.width;
		var deltY=scope.camera.position.z*moveY/scope.domElement.height;
		var position=scope.camera.position;
		position.setX(position.x-deltX*2);
		position.setY(position.y+deltY*2)
		// scope.camera.translateX(-deltX*2);
		// scope.camera.translateY(deltY*2);
		scope.camera.updateMatrixWorld(true);
	}
	DomEvent.on(this.domElement,'mousedown',mousedownFn);
	DomEvent.on(this.domElement,'mousemove',mousemoveFn);
	DomEvent.on(this.domElement,'mouseup',mouseupFn);
	DomEvent.on(this.domElement,'contextmenu',contextmenuFn);
	DomEvent.on(this.domElement,'wheel',wheelFn);
	DomEvent.on(window,'keydown', keydownFn);
}
export {cameraControl}