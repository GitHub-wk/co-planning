// InfoMaterial.building.component.js
import {texturesUrl} from '../../dataservice/config.js';
import {DomUtil,DomEvent,Util} from '../../core/core.js';

var UI=DomUtil.UI;

export default class InfoBuildingMaterial{
	constructor(intersectNames){
		this._intersectNames=intersectNames;
		this.element=DomUtil.createElement('div','info-building-material');
		this._initDom();		
	}
	_initDom(){
		var objectTextRow = new UI.Row();
		objectTextRow.add( new UI.Text("纹理图片").setWidth( '100px' ) );
		DomUtil.appendChild(this.element,objectTextRow.dom);
		var imgEl=DomUtil.create('img','',this.element);
		DomUtil.setStyle(imgEl,'width','150px');
		this.updateUI=function(object){
			console.log("updateUI in infoMaterial.building.component");
			imgEl.src=texturesUrl+object.userData.materialUrl;
		}
	}
	setIntersectNames(intersectNames){
		this._intersectNames=intersectNames;
		return this;
	}
	execute(intersects){
		var intersect=intersects[0];
		if(intersect&&this._intersectNames[intersect.object.name])
		{			
		    this.updateUI(intersect.object);
		 	DomUtil.appendChild(this.containerEle,this.element);
		}
	}
}