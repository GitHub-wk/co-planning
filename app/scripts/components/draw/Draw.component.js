// Draw.component.js
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import * as THREE from 'threejs';
import Pan from '../Pan.component.js';

export const DRAWMODE={
	'OFF':0,
	'LINE':'L',
	'CLOSE':'C',
	'BACK':'BACK',
	'EXIT':'E',
	'EXTRUDE':'EXTRUDE',
	'CLEAR':'CLEAR',
	'SPLINE':'SPLINE',
	'SELECT':'SELECT',
}
export const DRAWSIGNAL={
	'WILLDRAW':'WILLDRAW',
	'DRAWDONE':'DRAWDONE',
}
/**
 * @class drawpan components,to group child compoent
 * expose drawshape to child ,everytime child change
 * shape should call father.updateDrawMesh();
 * @param array backOperations is a stack store backData;
 * @param {object} [children] [store the children of this pan.every child 
 * should have drawMode property as index]
 * @function reset fuction to over this time draw.
 * @param {string} [drawMode] [if DrawMode not equal OFF will call child's draw()]
 */
export default class DrawPan extends Pan{
	constructor(intersectObjects,intersectNames,world){
		super(DomUtil.createElement('div','draw-pan'));
        this._intersectObjects=intersectObjects||[];
        this.intersectNames=intersectNames;  
        this._raycaster = new THREE.Raycaster();
		this.children={};
        this.reset();
        world&&this.resetWorld(world);
	}
	addChild(child){
		child.fatherPan=this;
        this.children[child.drawMode]=child;
        DomUtil.appendChild(this.element,child.element);
        return this;
	}
	removeChild(child){
		DomUtil.remove(child.element);
		child.fatherPan=null;
		delete this.children[child.drawMode];
		return this;
	}
	removeAllChild(){

	}
	removeDrawMesh(){
		if(this._drawMesh)
		{
			this.drawMeshGroup.remove(this._drawMesh);
			this.drawMesh=null;
		}
	}
	getDrawGroup(){
	 	return this.drawMeshGroup;
	}
	resetWorld(world){
		this._world=world;
		this.drawMeshGroup=new THREE.Group();
		this.drawMeshGroup.name='drawpan_mesh';
		this._world.scene.add(this.drawMeshGroup);
		var canvas=this._world.renderer.domElement;
		var raycaster=this._raycaster;
		var camera=this._world.camera;
		//for backoperation
		this.backOperation=[];
		var clickFn=function(event){			
        	if(this.drawMode!==DRAWMODE.OFF)
        	{
        		//for other component communicate
        		this._world.signal.emit(DRAWSIGNAL.WILLDRAW);
        		console.log('IN draw mode');
        		var mouse=new THREE.Vector2(0,0);
        		var mousePosition=DomUtil.getMousePosition(canvas,event);
        		mouse.x = (mousePosition.left/ canvas.width) * 2 - 1;
    			mouse.y = -(mousePosition.top/canvas.height) * 2 + 1;
    			raycaster.setFromCameraHP(mouse,camera);
    			var intersects = raycaster.intersectObjects(this._intersectObjects,true);
    			//console.log(this.children[this.drawMode]);
                this.children[this.drawMode].draw(intersects);
        	}
        }
		DomEvent.on(canvas,'click',Util.bind(clickFn,this));
		return this;
	}
	resetIntersectObjects(intersectObjects)
	{
		this._intersectObjects=intersectObjects;
		return this;
	}
	updateDrawMesh(){
		this._drawMesh&&this.drawMeshGroup.remove(this._drawMesh);
		this._drawMesh=drawShape(this.drawShape);
		//console.log('update');
		console.log(this._drawMesh);
		if(this._drawMesh)
		{
			this._drawMesh.translateZ(0.5);
			this._drawMesh.name="draw-line";
			this.drawMeshGroup.add(this._drawMesh);
		}	
	}
	setStartPoint(ponit3){
		if(this.drawShape._setStartPoint)
		{
			return true;
		}
		this.drawShape.moveTo(ponit3.x,ponit3.y);
		this.drawShape._setStartPoint=true;
		return false;
	}
	//@init new draw context
	reset(){
		//@ to avoid the bug group will have empty mesh
		
		this.drawShape=new THREE.Shape();
        this.drawShape._setStartPoint=false;
        this._drawMesh=null;
        this.backOperation=this.backOperation||[];
        Util.emptyArray(this.backOperation);
        //for component conmmunicate
        //this.drawMode=DRAWMODE.OFF;
        //this._world&&this._world.signal.emit("DRAWDONE");
        this.turnOffDrawMode();
	}
	turnOffDrawMode(){
		this.drawMode=DRAWMODE.OFF;
		 //for component conmmunicate
        this._world&&this._world.signal.emit(DRAWSIGNAL.DRAWDONE);
	}
	addTo(element)
	{
		DomUtil.appendChild(element,this.element);
	}

}

/**
 * [drawShap draw the shap in Draw class]
 * @param  {[type]} shape [description]
 * @return {[mesh]}       [description]
 */
function drawShape(shape){
	if(shape._setStartPoint)
	{
		//when there is no curves in shape return null;
		var drawMesh=new THREE.Mesh();
		var featurePoints=getShapeFeaturePoints(shape);
		var pointGeometry=new THREE.Geometry();
		Util.forEach(featurePoints,function(point){
			pointGeometry.vertices.push(new THREE.Vector3(point.x,point.y,0));
		});
		var pointsMesh=new THREE.Points(pointGeometry,
			new THREE.PointsMaterial({color:0x00ff00,size:5}));
		pointsMesh.name='featurePoints';
		drawMesh.add(pointsMesh)
		// solid line
		
		if(shape.curves.length>0)
		{
			var points = shape.createPointsGeometry();
			var lineMesh= new THREE.Line( points, 
			new THREE.LineBasicMaterial( { color:0xff0000,linewidth:10}));
			lineMesh.name='featureLine';
			drawMesh.add(lineMesh);
		}
		return drawMesh;
	}
	else{
		return null;
	}
}
function getShapeFeaturePoints(shape){
	var featurePoints=[];
	if(shape.curves.length===0)
	{
		featurePoints.push(shape.currentPoint);
		return featurePoints;
	}
	Util.forEach(shape.curves,function(curve,i){
				if(curve instanceof THREE.LineCurve)
				{
					if(i===0||!curve.v1.equals(featurePoints[featurePoints.length-1])){
						featurePoints.push(curve.v1);
					}
					featurePoints.push(curve.v2);
				}
				if(curve instanceof THREE.SplineCurve)
				{
					if(i===0||!curve.points[0].equals(featurePoints[featurePoints.length-1])){
						featurePoints.push(curve.points[0]);
					}
					Util.forEach(curve.points,function(point,i){
						if(i!==0){
							featurePoints.push(point);
						}
					});
				}				
			});
	//avoid bug when close a shap ,featuerPoint
	//TODO
	return featurePoints;

}