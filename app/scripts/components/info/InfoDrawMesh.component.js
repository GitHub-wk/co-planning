// InfoDrawMesh.component.js
import {Util,DomUtil} from '../../core/core.js';
//will checks all descendants
export default class InfoDrawMesh{
	constructor(intersectNames){
		this._intersectNames=intersectNames||{};
		this.element=DomUtil.createElement("div","info-drawmesh");
	}	
	setIntersectNames(intersectNames){
		this._intersectNames=intersectNames;
		return this;
	}
	execute(intersects){
		var intersect=intersects[0];
		if(intersect&&this._intersectNames[intersect.object.name])
		{
			var innerHtml=intersect.object.name+"<br/>";
			Util.forEach(intersect.object.geometry.vertices,function(vertice,i){
				innerHtml+="vertice["+i+"]"+Util.formatNum(vertice.x,1)+';'+Util.formatNum(vertice.y,1)+';'+Util.formatNum(vertice.z,1)+"</br>";
			});
			this.element.innerHTML=innerHtml;
			var infoEle=this.containerEle;
			if(infoEle)
			{
				DomUtil.empty(infoEle);
				DomUtil.appendChild(infoEle,this.element);
			}
		}
	}
}