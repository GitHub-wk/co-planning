// worldFactory.js
import * as THREE from 'threejs';
import {World3d} from './components/world3d.js';
import {globalEvent} from './components/globalEvents.js';
import {GuiControl} from './components/guiControl.component.js';
import {DomUtil,Draggable,DomEvent} from './core/core.js';
import {BuildingStore} from './dataservice/WorldStore';
import {cameraControl} from './plugin/cameraControl.js';
import {Solar} from './components/Solar.js';

export default class worldFactory{
	static generateDefaultWorld(){
		if(worldFactory.defaultWorld) return worldFactory.defaultWorld;
		/*scence camera render instance*/
	    var canvas=document.getElementById('webgl');
	    canvas.height=canvas.parentNode.clientHeight; 
	    canvas.width=canvas.parentNode.clientWidth;
	    var renderer = new THREE.WebGLRenderer({canvas:canvas});
	    renderer.shadowMapEnabled = true;
	    renderer.shadowMapSoft = true;
	    // scene instance
	    var scene = new THREE.Scene();
	    scene.background = new THREE.Color(0x9999ff);
	    //camera instance
	    var camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 40000000);
	    camera.position.z = 500;
	    camera.position.y = 0;

	    /*create world*/
	    var world=new World3d(scene,camera,renderer);
	   
	    //light instances
	    var pointLight = new THREE.PointLight(0xffffff,1,0);
	    pointLight.position.set(0, 0, 200);
	    pointLight.castShadow = true;
	    var pointLightHelper=new THREE.PointLightHelper(pointLight,1);
	    var amLight=new THREE.AmbientLight(0xffffff,0.8);

	    //gui-control
	    var  guiControl=new GuiControl();
	    //console.log(guiControl);
	    guiControl
	    //.addLightControl(pointLight)
	                .addStatsMonitor("Stats-output");
	    new Draggable(DomUtil.getById("Stats-output"));
	    //new Draggable(guiControl.gui.domElement.parentNode);
	    
	    //orbit-control
	    // var orbit=new THREE.OrbitControls(world.camera, world.renderer.domElement);
	    var orbit=new cameraControl(world.camera, world.renderer.domElement);  
	    world.addToScene(amLight);

	    //add solar on the world
	    var preventSolar;
	    globalEvent.on('addSolarToScreen',function(solar){
	    	if(!!preventSolar)
	    	{
	    		world.scene.remove(preventSolar.light);
	    		world.scene.remove(preventSolar.light.target);
	    	}
	    	if(!!solar){
	    		preventSolar = solar 
   				world.addToScene(solar.light, solar.light.target);	
	    	}
	    })
	    //re-render world
	    globalEvent.on('requestAmimationFrame',function() {
	        world.render();
	    });
	    //re-size world
	    globalEvent.on('windowResize',function(e) {
	        var canvas=world.renderer.domElement;
	        // console.log(canvas);
	        // clientWidth clientHeight
	        canvas.height=canvas.parentNode.clientHeight; 
	        canvas.width=canvas.parentNode.clientWidth;
	        world.camera.aspect = canvas.width / canvas.height;
	        world.camera.updateProjectionMatrix();
	        world.renderer.setSize(canvas.width,canvas.height);
	    });
	    worldFactory.worlds.push(world);
	    worldFactory.defaultWorld=world;
	    return world;
	}
}
worldFactory.worlds=[];
