// buildingTool.js
import * as THREE from 'threejs';

var createBuilding=function(shape){
	var extrudeSettings = {
	        steps: 1,
	        amount: 10,
	        bevelEnabled: false,
	    };
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var position=geometry.center().negate();
    var material1= new THREE.MeshLambertMaterial({color:0xD0715E });
    var texture = new THREE.TextureLoader().load( "images/textures/brick_diffuse.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
    var material2=new THREE.MeshLambertMaterial({map:texture});
    var buildingMesh = new THREE.Mesh(geometry, new THREE.MultiMaterial([material1,material2]));
    buildingMesh.name = 'building';
    buildingMesh.castShadow = true;
    buildingMesh.receiveShadow = true;
    buildingMesh.position.copy(position);
    buildingMesh.userData.floorHeight=10;
    buildingMesh.userData.floorNum=1;
    resetBuildingFaceUV(geometry,1,1);
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


export {
	createBuilding,
	modifyBuildingHeight,
}