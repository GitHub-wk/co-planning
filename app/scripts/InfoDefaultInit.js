// InfoDefaultInit.js
import Info from './components/info/Info.component.js';
import {DomUtil,DomEvent} from './core/core.js';
import InfoLayer from './components/info/InfoLayer.component.js';
import InfoObject from './components/info/InfoObject.component.js';
import InfoMaterial from './components/info/InfoMaterial.component.js';
import InfoBuilding from './components/info/InfoObject.building.component.js';
import InfoBuildingMaterial from './components/info/InfoMaterial.building.component.js';
import {BuildingAction} from './dataservice/WorldAction.js';
import {RemoveObjectCommand,SetValueCommand} from './components/commands/commands.js';

var lang={
	'LAYER':'图层',
	'OBJECT':'物体',
	'MATERIAL':'材质',
}
require('./info.less');
var infoEle=DomUtil.getById("info-pan");
var infoInit=new Info(infoEle);
var layerTab=new InfoLayer();
var objectTab=new InfoObject();
var materialTab=new InfoMaterial();

objectTab.signal.on('update',function(command){
	console.log(command);
	BuildingAction.command(command);
});
objectTab.signal.on('remove',function(command){
	BuildingAction.remove(command);
});
layerTab.signal.on('clear',function(layer){
	var group=layer.object;
	//BUG if remove is not run,group.children will always have.
	while(group.children[0])
	{
		BuildingAction.remove(new RemoveObjectCommand(group.children[0]));
	}
});
layerTab.signal.on('visibleall',function(layer){
	visibleAllMesh(layer.object)
})
//make mesh and it's children visible=true;
function visibleAllMesh(mesh){
	if(mesh.visible!==undefined&&!mesh.visible)
	{
		BuildingAction.command(new SetValueCommand(mesh,'visible',true));
	}
	for(var i=0;i<mesh.children.length;i++)
	{
		visibleAllMesh(mesh.children[i]);
	}
}

materialTab.signal.on('changeMaterial',function(command){
	console.log(command);
	BuildingAction.command(command);
})


infoInit.addChild(layerTab)
		.addChild(objectTab)
		.addChild(materialTab);
var infoBuildingInit=new InfoBuilding();
objectTab.addChild(infoBuildingInit);
var infoBuildingMaterialInit=new InfoBuildingMaterial();
materialTab.addChild(infoBuildingMaterialInit);
//buildDom		
var tab=DomUtil.create('div','info-tab',infoInit.element);
var layerTabItem=DomUtil.create('span','tab-item',tab);
var objectTabItem=DomUtil.create('span','tab-item',tab);
var materialTabItem=DomUtil.create('span','tab-item',tab);
layerTabItem.innerHTML=lang.LAYER;
objectTabItem.innerHTML=lang.OBJECT;
materialTabItem.innerHTML=lang.MATERIAL;
var clickFn=function(event){
	select(event.target.textContent);
}

DomEvent.on(layerTabItem,'click',clickFn);
DomEvent.on(objectTabItem,'click',clickFn);
DomEvent.on(materialTabItem,'click',clickFn);	
DomUtil.appendChild(infoInit.element,[layerTab.element,objectTab.element,materialTab.element]);
var select=function(section){
	DomUtil.removeClass(layerTabItem,'selected');
	DomUtil.removeClass(objectTabItem,'selected');
	DomUtil.removeClass(materialTabItem,'selected');
	DomUtil.setStyle(layerTab.element,'display','none');
	DomUtil.setStyle(objectTab.element,'display','none');
	DomUtil.setStyle(materialTab.element,'display','none');
	switch (section){
		case lang.LAYER:
			DomUtil.addClass(layerTabItem,'selected');
			DomUtil.setStyle(layerTab.element,'display','block');
			break;
		case lang.OBJECT:
			DomUtil.addClass(objectTabItem,'selected');
			DomUtil.setStyle(objectTab.element,'display','block');
			break;
		case lang.MATERIAL:
			DomUtil.addClass(materialTabItem,'selected');
			DomUtil.setStyle(materialTab.element,'display','block');
			break;
	}
}
select(lang.LAYER);
export {infoInit,infoBuildingInit,infoBuildingMaterialInit,layerTab,objectTab};