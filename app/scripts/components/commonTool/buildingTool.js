// buildingTool.js
import * as THREE from 'threejs';
import {MercatorProjection} from '../../geo/MercatorProjection.js';
var projection=new MercatorProjection();
var createBuilding=function(shape,properties){
	var extrudeSettings = {
	        steps: 1,
	        amount: (properties&&properties.FLOORNUM&&properties.FLOORHEIGHT)?properties.FLOORNUM*properties.FLOORHEIGHT:10,
	        bevelEnabled: false,
	    };
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var position=geometry.center().negate();
    var material1= new THREE.MeshLambertMaterial({color:0xD0715E });
    //TODO use peoperties to set material url;
    var texture = new THREE.TextureLoader().load( "images/textures/brick_diffuse.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
    var material2=new THREE.MeshLambertMaterial({map:texture});
    var buildingMesh = new THREE.Mesh(geometry, new THREE.MultiMaterial([material1,material2]));
    buildingMesh.name ='building';
    buildingMesh.castShadow = true;
    buildingMesh.receiveShadow = true;
    buildingMesh.position.copy(position);
    buildingMesh.userData.floorHeight=(properties&&properties.FLOORHEIGHT)?properties.FLOORHEIGHT:10;
    buildingMesh.userData.floorNum=(properties&&properties.FLOORNUM)?properties.FLOORNUM:1;
    buildingMesh.userData.id=(properties&&properties.ID)?properties.ID:buildingMesh.uuid;
    buildingMesh.userData.name=(properties&&properties.NAME)?properties.NAME:'建筑';
    buildingMesh.userData.materialUrl=(properties&&properties.MATERIALURL)?properties.MATERIALURL:'buildingDefualtUrl.jpg';
    buildingMesh.userData.layer=properties?properties.LAYER:'';
    if(properties&&properties.ROTATION){
    	buildingMesh.rotation.copy((new THREE.Euler()).fromArray(properties.ROTATION));
    }
    if(properties&&properties.SCALE)
    {
    	buildingMesh.scale.copy((new THREE.Vector3()).fromArray(properties.SCALE));
    }
    buildingMesh.position.setZ(buildingMesh.position.z+(properties?properties.STARTHEIGHT||0:0));
    resetBuildingFaceUV(geometry,buildingMesh.userData.floorNum,1);
    return buildingMesh;
}


var modifyBuildingHeight=function(mesh,floorHeight,floorNum){
	var vertices=mesh.geometry.vertices;
	var baseZ=vertices[0].z;
	var buildingHeight=floorHeight*floorNum;
	for(var i=vertices.length/2;i<vertices.length;i++)
	{
		vertices[i].z=baseZ+buildingHeight;
	}
	mesh.userData.floorHeight=floorHeight;
	mesh.userData.floorNum=floorNum;
	var position=mesh.geometry.center().negate();
	mesh.position.add(position);
	resetBuildingFaceUV(mesh.geometry,floorNum,1);
	mesh.geometry.verticesNeedUpdate=true;	
}

var resetBuildingFaceUV=function(geometry,repeatY,repeatX)
{
	var verticesNum=geometry.vertices.length;
	var faceVertexUvs=geometry.faceVertexUvs[0];
	var topbottomtriangleNum=verticesNum-4;
	var odd=true;
	for(var i=topbottomtriangleNum;i<faceVertexUvs.length;i++)
	{
		var faceUv=faceVertexUvs[i];
		if(odd)
		{
			faceUv[0].set(0,0);
			faceUv[1].set(1,0);
			faceUv[2].set(0,1*repeatY);
		}
		else{
			faceUv[0].set(1,0);
			faceUv[1].set(1,1*repeatY);
			faceUv[2].set(0,1*repeatY);
		}
		odd=!odd;
	}
	geometry.uvsNeedUpdate=true;
}

var jsonToBuilding=function(featureJson){
	var feature=featureJson;
	var geometry=feature.geometry;
	var properties=feature.properties;
	var coordinates=geometry.coordinates;
	var points=[];
	for(var j=0;j<coordinates[0].length;j++)
	{
		var coordinate=coordinates[0][j];
		var p=projection.lngLatToPoint({lng:coordinate[0],lat:coordinate[1]});
		var point=new THREE.Vector2(p.x,p.y);
		// var point=new THREE.Vector2(coordinate[0]-buildingsBox.centerX,coordinate[1]-buildingsBox.centerY);
		points.push(point);
	}
	var shape=new THREE.Shape();
	shape.fromPoints(points);
	var building=createBuilding(shape,properties);
	return building;	
}
var buildingTOJSON=function(buildingMesh){
	var Feature={ "type": "Feature", "properties": { "NAME": '', "ID": '', "FLOORHEIGHT": 0, "FLOORNUM": 0, "LAYER": '',"SCALE":1,"ROLATE":[0,0,0],"STARTHEIGHT":0}, "geometry": { "type": "Polygon", "coordinates": [[]] } };
	Feature.properties.NAME=buildingMesh.userData.name;
	Feature.properties.ID=buildingMesh.userData.id;
	Feature.properties.FLOORHEIGHT=buildingMesh.userData.floorHeight;
	Feature.properties.FLOORNUM=buildingMesh.userData.floorNum;
	Feature.properties.LAYER=buildingMesh.userData.layer.name;
	Feature.properties.MATERIALURL=buildingMesh.userData.materialUrl;		
	Feature.properties.SCALE=buildingMesh.scale.toArray();
	Feature.properties.ROTATION=buildingMesh.rotation.toArray();
	Feature.properties.STARTHEIGHT=buildingMesh.position.z-(buildingMesh.userData.floorHeight*buildingMesh.userData.floorNum/2);
	var vertices=buildingMesh.geometry.vertices;
	var position=buildingMesh.position;
	for(var i=0;i<(vertices.length)/2;i++)
	{
		var point=new THREE.Vector3(0, 0, 0);
		var lngLat=projection.pointToLngLat(point.add(vertices[i]).add(buildingMesh.position));
		Feature.geometry.coordinates[0].push([lngLat.lng,lngLat.lat]);
	}
	return Feature;
}
export {
	createBuilding,
	modifyBuildingHeight,
	buildingTOJSON,
	jsonToBuilding
}