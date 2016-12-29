 // menu.importdata.component.js
 import {DomEvent,DomUtil} from '../../core/core.js';
 import {ImportItem,IMPORTTYPE} from './menuFile.import.component.js';

var lang={
	"FILE":'文件',
	'IMPORT':'导入',
	'BUILDING':'建筑',
	'GREEN':'绿化',
	'MODEL':'模型',
}
 export default class MenuFile{
 	constructor(){
 		this.element=DomUtil.createElement('span','menu-bar',lang.FILE);
 		console.log(this.element);
 		var menuFile=DomUtil.create('div','menu-file',this.element);
 		var importText=DomUtil.createElement('div','item item-text',lang.IMPORT);
 		var importBuilding=new ImportItem(lang.BUILDING,IMPORTTYPE.BUILDING);
 		var importGreen=new ImportItem(lang.GREEN,IMPORTTYPE.GREEN);
 		var importModel=new ImportItem(lang.MODEL,IMPORTTYPE.MODEL);
 		console.log(importBuilding,importGreen,importModel)
 		DomUtil.appendChild(menuFile,[importText,importBuilding.element,importGreen.element,importModel.element]);
 	}
 }