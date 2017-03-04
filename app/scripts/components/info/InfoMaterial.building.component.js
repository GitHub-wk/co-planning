// InfoMaterial.building.component.js
import {texturesUrl} from '../../dataservice/config.js';
import {DomUtil,DomEvent,Util} from '../../core/core.js';
import {SetMaterialCommand} from '../commands/commands.js';

var UI=DomUtil.UI;

var lang={
	"TEXTURE":'纹理图片',
	"CHANGE":'改变'
}
export default class InfoBuildingMaterial{
	constructor(intersectNames){
		this._intersectNames=intersectNames;
		this.element=DomUtil.createElement('div','info-building-material');
		this._initDom();		
	}
	_initDom(){
		var materialTextRow = new UI.Row();
		materialTextRow.add( new UI.Text(lang.TEXTURE).setWidth( '100px' ) );
		var materialChange=new UI.Button(lang.CHANGE).setClass('btn btn-sm').setPosition('absolute').setRight('10px').onClick(changeMaterial);
		materialTextRow.add(materialChange);
		DomUtil.appendChild(this.element,materialTextRow.dom);
		var imgEl=DomUtil.create('img','',this.element);
		DomUtil.setStyle(imgEl,'width','150px');

		var scope=this;
		this.updateUI=function(object){
			console.log("updateUI in infoMaterial.building.component");
			imgEl.src=texturesUrl+object.userData.materialUrl;
		}


		function changeMaterial(){
			scope.fatherComponent.signal.emit('changeMaterial',new SetMaterialCommand(scope.selectedObject,'building2.jpg'));
			scope.selectedObject&&(scope.updateUI(scope.selectedObject));
		}
	}
	setIntersectNames(intersectNames){
		this._intersectNames=intersectNames;
		return this;
	}
	execute(intersects){
		var intersect=intersects[0];
		this.selectedObject=null;
		if(intersect&&this._intersectNames[intersect.object.name])
		{
		 	this.selectedObject=intersect.object;			
		    this.updateUI(intersect.object);
		 	DomUtil.appendChild(this.containerEle,this.element);
		}
	}
}