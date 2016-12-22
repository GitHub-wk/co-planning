// 3dworld.js
// date 2016/11/26
/**
 * @class then container of the world;
 */
import {MercatorProjection} from '../geo/MercatorProjection.js';
import {EventEmitter} from '../core/core.js';
export class World3d{
	scene:any;
	constructor(scene,camera,render){
		this.scene=scene;
		this.camera=camera;
		this.renderer=render;
		//communite between world's components
		this.signal=new EventEmitter();
		this.projection=new MercatorProjection();

	}
	render(){
		this.renderer.render(this.scene,this.camera);
		return this;
	}
	moveToLngLat(lngLat){
		var point=this.projection.lngLatToPoint(lngLat);
		var vec3=new THREE.Vector3(point.x,point.y,500);
		this.moveToPoint(vec3);
	}
	moveToPoint(point){
		this.camera.position.copy(point);
		this.camera.lookAt(new THREE.Vector3(point.x,point.y,0));
		this.camera.updateMatrixWorld(true);
		this.signal.emit('CAMERACHANGE')
	}
	addToScene(obj)
	{

       for(var i=0;i<arguments.length;i++)
       {
       	    // console.log(arguments[i]);
       		this.scene.add(arguments[i].getInstance?arguments[i].getInstance():arguments[i]);		
       }
        return this;
	}
}
