// ground.js
import * as THREE from 'threejs';
import {TileLayer} from './TileLayer.js';
import {MercatorProjection} from '../../geo/MercatorProjection.js';

/**
 * @class create a  landMesh;
 */
export class Ground{
	constructor(width,textures)
	{
		this.width=width;
		if(textures)
		{
			var loader = new THREE.TextureLoader();
			this.groundTexture = loader.load(textures);
			this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
	        this.groundTexture.repeat.set(1, 1);
		}
		var geometry = new THREE.PlaneGeometry(2 * width, 2 * width);
	    var material = new THREE.MeshLambertMaterial({ map:this.groundTexture});
	    this.instance = new THREE.Mesh(geometry, material);
	    this.instance.receiveShadow = true;
	    this.instance.name = 'land';
	    return this;
	}
	getInstance(){
    	return this.instance;
    }
}
export class GroundLayer extends TileLayer{
	constructor(){
		var groundGroup=new THREE.Group();
		groundGroup.name='ground_group';
		super(groundGroup,'地面');
		this.setSelectable(false).setDeleteable(false).setClearable(false);
		return this;
	}
	add(ground){
		ground.getInstance?this.object.add(ground.getInstance()):this.object.add(ground);
	}
	getInstance(){
		return this.object;
	}
}

// export class GroundLayer extends Layer{
// 	constructor(){
// 		var groundGroup=new THREE.Group();
// 		groundGroup.name='ground_group';
// 		super(groundGroup,'地面');
// 		this.setSelectable(false).setDeleteable(false).setClearable(false);
// 		return this;
// 	}
// 	add(ground){
// 		ground.getInstance?this.object.add(ground.getInstance()):this.object.add(ground);
// 	}
// 	getInstance(){
//     	return this.object;
//     }
//     getTile(x,y,z)
//     {

//     	var loader = new THREE.TextureLoader();
//     	var url='http://shangetu3.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150504&app=webearth2&v=009&udt=20150601';
//     	//var url='http://online3.map.bdimg.com/tile/?qt=tile&x='+x+'&y='+y+'&z='+z+'&styles=pl&scaler=1&udt=20161216';
// 		var tileTexture = loader.load(Util.template(url,{x:x,y:y,z:z}));
// 		tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
//         tileTexture.repeat.set(1, 1);
//     	var geometry = new THREE.PlaneGeometry(256*Math.pow(2,18-z),256*Math.pow(2,18-z));
// 	    var material = new THREE.MeshLambertMaterial({ map:tileTexture});
// 	    var tile= new THREE.Mesh(geometry, material);
// 	    tile.receiveShadow = true;
// 	    tile.name = 'land';
// 	    tile.userData.id=x+'_'+y+'_'+z;
// 	    tile.position.set(256*(x+0.5)*Math.pow(2,18-z),256*(y+0.5)*Math.pow(2,18-z),0);
// 	    return tile;
//     }
//     loadTile(world){
//     	var plane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
//     	var raycaster = new THREE.Raycaster();
// 		var mouse = new THREE.Vector2();
// 		var camera=world.camera;
// 		var canvas=world.renderer.domElement;
// 		var mouseState='off';
// 		var scope=this;
// 		DomEvent.on(canvas,'mousedown',function(){
// 			mouseState='down';
// 		});
// 		DomEvent.on(canvas,'mousemove',function(e){
// 			if(mouseState=='down'&&(e.movementX!==0||e.movementY!==0))
// 			{
// 				mouseState='move';
// 			}
// 		});
// 		DomEvent.on(canvas,'mouseup',function(){
// 			if(mouseState=='move')
// 			{
// 				refreshTile();
// 			}
// 		});
// 		function refreshTile(){
// 			mouse.set(1,1);
// 			raycaster.setFromCamera(mouse,camera);		
// 			var ray1=raycaster.ray.clone();
// 			mouse.set(1,-1);
// 			raycaster.setFromCamera(mouse,camera);
// 			var ray2=raycaster.ray.clone();
// 			mouse.set(-1,-1);
// 			raycaster.setFromCamera(mouse,camera);
// 			var ray3=raycaster.ray.clone();
// 			mouse.set(-1,1);
// 			raycaster.setFromCamera(mouse,camera);
// 			var ray4=raycaster.ray.clone();
// 			var point1=ray1.intersectPlane(plane);
// 			var point2=ray2.intersectPlane(plane);
// 			var point3=ray3.intersectPlane(plane);
// 			var point4=ray4.intersectPlane(plane);
// 			var points=[point1,point2,point3,point4];
// 			var box=Box2d(points);
// 			if(box)
// 			{
// 				var z=18-Math.log2(Math.max(box.xWidth,box.yWidth)/256)+2;
// 				z=Math.min(18,Math.floor(z));
// 				var tileNum={};
// 				tileNum.xMin=Math.floor(box.xMin/(256*Math.pow(2,18-z)));
// 				tileNum.yMin=Math.floor(box.yMin/(256*Math.pow(2,18-z)));
// 				tileNum.xMax=Math.floor(box.xMax/(256*Math.pow(2,18-z)));
// 				tileNum.yMax=Math.floor(box.yMax/(256*Math.pow(2,18-z)));
// 				tileNum.xWidth=tileNum.xMax-tileNum.xMin;
// 				tileNum.yWidth=tileNum.yMax-tileNum.yMin;
// 				tileNum.z=z;
// 				console.log(tileNum);
// 				Util.forEach(scope.object.children,function(child){
// 					child.userData.old=true;
// 				});
// 				for(var x=tileNum.xMin-1;x<=tileNum.xMax+1;x++)
// 				{
// 					for(var y=tileNum.yMin-1;y<=tileNum.yMax+1;y++)
// 					{
// 						var tile=getByUserDataId(scope.object,x+'_'+y+'_'+z);
// 						if(tile)
// 						{
// 							tile.userData.old=false;
// 						}
// 						else{scope.object.add(scope.getTile(x,y,z));}
// 					}
// 				}
// 				var oldChild=[];
// 				for(var i=0;i<scope.object.children.length;i++){
// 					var object=scope.object.children[i];
// 					if(object.userData.old) {oldChild.push(object);}
// 				}
// 				Util.forEach(oldChild,function(child){
// 					scope.object.remove(child);
// 				})

// 			}

// 		}		
//     }
// }
// function Box2d(ary)
// {
// 	var boundBox={
// 		xMin:Infinity,
// 		yMin:Infinity,
// 		xMax:-Infinity,
// 		yMax:-Infinity,
// 	};

// 	for(var i=0;i<ary.length;i++)
// 	{
// 		//if ary[i]==null||undefined return null;
// 		if(!ary[i]) return null;
// 		boundBox.xMin=Math.min(ary[i].x,boundBox.xMin);
// 		boundBox.yMin=Math.min(ary[i].y,boundBox.yMin);
// 		boundBox.xMax=Math.max(ary[i].x,boundBox.xMax);
// 		boundBox.yMax=Math.max(ary[i].y,boundBox.yMax);
// 	}
// 	boundBox.xWidth=boundBox.xMax-boundBox.xMin;
// 	boundBox.yWidth=boundBox.yMax-boundBox.yMin;
// 	return boundBox;
// }
// function getByUserDataId(object,id){
// 	if(object.userData.id===id)
// 	{
// 		return object;
// 	}
// 	for(var i=0;i<object.children.length;i++)
// 	{
// 		var obj=getByUserDataId(object.children[i],id);
// 		if(obj){
// 			return obj
// 		}
// 	}
// 	return null;
// }