// TileLayer.js
import {Layer} from './Layer.js';
import {Util,DomEvent} from '../../core/core.js';
import * as THREE from 'threejs';
var defualtMap=(function(){
	var tmpcanvas = document.createElement('canvas');
	tmpcanvas.width = 256;
	tmpcanvas.height = 256;
	var tmpctx = tmpcanvas.getContext('2d');
	tmpctx.fillStyle="#96CDCD";
	tmpctx.fillRect(0,0,256,256);
	 var defualtMap = new THREE.CanvasTexture(tmpcanvas);
	 return defualtMap;
})()
export class TileLayer extends Layer{
	constructor(object,name,url){
		super(object,name);
		this.resetUrl(url);
		this._plane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
    	this._raycaster = new THREE.Raycaster();
		this._mouse = new THREE.Vector2();
	}
	resetUrl(url){
		this.url=url||'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
	}
	destoryWorld(){
		if(this._world)
		{
			DomEvent.off(this._world.renderer.domElement,'mouseup',this._mouseupFn);
			DomEvent.off(this._world.renderer.domElement,'mousedown',this._mousedownFn);
			DomEvent.off(this._world.renderer.domElement,'mousemove',this._mousemoveFn);
			this._world.signal.removeListener('CAMERACHANGE',this._camerachangeFn);
			this._world=null;
		}
	}
	resetWorld(world){
		this.destoryWorld();
		this._world=world;
		var canvas=world.renderer.domElement;
		var mouseState='off';
		this._mousedownFn=function(){
			mouseState='down';
		}
		this._mousemoveFn=function(e){
			if(mouseState=='down'&&(Math.abs(e.movementX)>2||Math.abs(e.movementY)>2))
			{
				mouseState='move';
			}
		}
		this._mouseupFn=Util.bind(function(){
			if(mouseState=='move')
			{
				this.refreshTile();
			}
		},this); 
		DomEvent.on(canvas,'mousedown',this._mousedownFn);
		DomEvent.on(canvas,'mousemove',this._mousemoveFn);
		DomEvent.on(canvas,'mouseup',this._mouseupFn);
		this._camerachangeFn=Util.bind(function(){
			this.refreshTile();
		},this)
		this._world.signal.on('CAMERACHANGE',this._camerachangeFn);
	}
	refreshTile(){
		var camera=this._world.camera;
		this._mouse.set(1,1);
		this._raycaster.setFromCameraHP(this._mouse,camera);		
		var ray1=this._raycaster.ray.clone();
		this._mouse.set(1,-1);
		this._raycaster.setFromCameraHP(this._mouse,camera);
		var ray2=this._raycaster.ray.clone();
		this._mouse.set(-1,-1);
		this._raycaster.setFromCameraHP(this._mouse,camera);
		var ray3=this._raycaster.ray.clone();
		this._mouse.set(-1,1);
		this._raycaster.setFromCameraHP(this._mouse,camera);
		var ray4=this._raycaster.ray.clone();
		var point1=ray1.intersectPlane(this._plane);
		var point2=ray2.intersectPlane(this._plane);
		var point3=ray3.intersectPlane(this._plane);
		var point4=ray4.intersectPlane(this._plane);
		var points=[point1,point2,point3,point4];
		var box=Box2d(points);
		this.loadBoxTile(box);
	}
	getTile(x,y,z){
    	var geometry = new THREE.PlaneGeometry(256*Math.pow(2,18-z),256*Math.pow(2,18-z));
	    var material = new THREE.MeshLambertMaterial({ map:defualtMap});
	    var tile= new THREE.Mesh(geometry, material);
    	var loader = new THREE.TextureLoader();
	    tile.userData.id=x+'_'+y+'_'+z;
	    loader.load(Util.template(this.url,{x:x,y:y,z:z}),function(tileTexture){
			tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
	        tileTexture.repeat.set(1, 1);
	        tile.material.map=tileTexture;
	    });
	    return tile;   
	}
	//TMS map Tile
	loadBoxTile(box){
		if(box)
			{
				var z=18-Math.log2(Math.max(box.xWidth,box.yWidth)/256)+2;
				z=Math.max(0,Math.min(18,Math.floor(z)));
				var tileNum={};
				tileNum.xMin=Math.floor((33554432+box.xMin)/(256*Math.pow(2,18-z)));
				tileNum.yMin=Math.floor((33554432-box.yMax)/(256*Math.pow(2,18-z)));
				tileNum.xMax=Math.floor((33554432+box.xMax)/(256*Math.pow(2,18-z)));
				tileNum.yMax=Math.floor((33554432-box.yMin)/(256*Math.pow(2,18-z)));
				tileNum.xWidth=tileNum.xMax-tileNum.xMin;
				tileNum.yWidth=tileNum.yMax-tileNum.yMin;
				tileNum.z=z;
				console.log(tileNum);
				Util.forEach(this.object.children,function(child){
					child.userData.old=true;
				});
				for(var x=tileNum.xMin-1;x<=tileNum.xMax+1;x++)
				{
					for(var y=tileNum.yMin-1;y<=tileNum.yMax+1;y++)
					{
						var tile=getByUserDataId(this.object,x+'_'+y+'_'+z);
						if(tile)
						{
							tile.userData.old=false;
						}
						else{
							if(x>=0&&y>=0&&z>=0&&x<Math.pow(2,z)&&y<Math.pow(2,z))
							{
								var tile=this.getTile(x,y,z);
								tile.position.set((x+0.5)*Math.pow(2,26-z)-33554432,33554432-(y+0.5)*Math.pow(2,26-z),0);
								tile.receiveShadow = true;
							    tile.name = 'land';
							    this.object.add(tile);
							}
						}
					}
				}
				var oldChild=[];
				for(var i=0;i<this.object.children.length;i++){
					var object=this.object.children[i];
					if(object.userData.old) {oldChild.push(object);}
				}
				Util.forEach(oldChild,Util.bind(function(child){
					this.object.remove(child);
				},this));

			}
	}

} 
function Box2d(ary)
{
	var boundBox={
		xMin:Infinity,
		yMin:Infinity,
		xMax:-Infinity,
		yMax:-Infinity,
	};

	for(var i=0;i<ary.length;i++)
	{
		//if ary[i]==null||undefined return null;
		if(!ary[i]) return null;
		boundBox.xMin=Math.min(ary[i].x,boundBox.xMin);
		boundBox.yMin=Math.min(ary[i].y,boundBox.yMin);
		boundBox.xMax=Math.max(ary[i].x,boundBox.xMax);
		boundBox.yMax=Math.max(ary[i].y,boundBox.yMax);
	}
	boundBox.xWidth=boundBox.xMax-boundBox.xMin;
	boundBox.yWidth=boundBox.yMax-boundBox.yMin;
	return boundBox;
}
function getByUserDataId(object,id){
	if(object.userData.id===id)
	{
		return object;
	}
	for(var i=0;i<object.children.length;i++)
	{
		var obj=getByUserDataId(object.children[i],id);
		if(obj){
			return obj
		}
	}
	return null;
}