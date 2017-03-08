// InfoObject.building.component.js
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import * as THREE from 'threejs';
import {SetBuildingHeightCommand} from '../commands/commands.js';
import {buildingTOJSON,getArea} from '../commonTool/buildingTool.js';

var UI=DomUtil.UI;
var lang={
	'FLOORHEIGHT':'层高',
	'FLOORNUM':'层数',
	'AREA':'面积'
}
export default class infoBuilding{
	constructor(intersectNames){
		this._intersectNames=intersectNames||{};
		this.element=DomUtil.createElement('div','info-building');
		this._initDom();		
	}
	_initDom(){
		//height
		var objectHeightRow = new UI.Row();
		var objectHeight = new UI.Number().setStep( 10 ).setUnit( 'm' ).setWidth( '50px' ).onChange( update );
		objectHeight.min=0.1;		
		objectHeightRow.add(new UI.Text(lang.FLOORHEIGHT).setWidth('60px'));
		objectHeightRow.add(objectHeight);

		DomUtil.appendChild(this.element,objectHeightRow.dom);

		var objectFloorRow = new UI.Row();
		var objectFloor = new UI.Integer(1).setWidth( '100px' ).onChange( update );
		objectFloor.min=1;	
		objectFloorRow.add(new UI.Text(lang.FLOORNUM).setWidth('60px'));
		objectFloorRow.add(objectFloor);

		DomUtil.appendChild(this.element,objectFloorRow.dom);

		//area
		var objectAreaRow = new UI.Row();
		var objectArea = new UI.Text();
		objectAreaRow.add( new UI.Text(lang.AREA).setWidth( '60px' ) );
		objectAreaRow.add(objectArea);
		DomUtil.appendChild(this.element,objectAreaRow.dom);

		var scope=this;
		function update(){
			var object=scope.selectedObject;
			if(object!=null){			
				var floorHeight=objectHeight.getValue();
				var floorNum=objectFloor.getValue();
				if(Math.abs(object.userData.floorHeight-floorHeight)>=0.01||Math.abs(object.userData.floorNum-floorNum))
				{
					// modifyBuildingHeight(object,floorHeight,floorNum);
					if(scope.fatherComponent)
					{
						scope.fatherComponent.signal.emit('update',new SetBuildingHeightCommand(object,floorNum,floorHeight,scope.fatherComponent.signal));
					}
				}
			}

		}
		this.updateUI=function(object){
			Util.log('updateUI in infoObject.building.component');
			objectHeight.setValue(object.userData.floorHeight||10);
			objectFloor.setValue(object.userData.floorNum||1);
			var buildingJson=buildingTOJSON(object);
			var area=getArea(buildingJson.geometry.coordinates[0]).toFixed(2);
			objectArea.setValue(area+"(m2)");
		}
	}
	setIntersectNames(intersectNames){
		this._intersectNames=intersectNames;
		return this;
	}
	execute(intersects){
		var intersect=intersects[0];
		this.unoutlineBuilding();
		if(intersect&&this._intersectNames[intersect.object.name])
		{
			    this.selectedObject=intersect.object;
			    this.updateUI(this.selectedObject);
			    this.outlineBuilding(this.selectedObject);
			 	DomUtil.appendChild(this.containerEle,this.element);
		}
	}
	unoutlineBuilding(){
		if(this.selectedObject)
		{
			Util.emptyArray(this.selectedObject.children);
			this.selectedObject=null;
		}
	}
	outlineBuilding(mesh){
		var outlineMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );
		var outlineMesh = new THREE.Mesh( mesh.geometry, outlineMaterial);
		outlineMesh.name='building-outline';
		outlineMesh.scale.multiplyScalar(1.05);
		mesh.add( outlineMesh );
	}
}