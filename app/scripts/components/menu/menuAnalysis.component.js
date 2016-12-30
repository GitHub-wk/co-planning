 // menu.importdata.component.js
 import {DomEvent,DomUtil} from '../../core/core.js';
 import {ImportItem,IMPORTTYPE} from './menuFile.import.component.js';

var lang = {
	"ANALYSIS": "分析",

	"LIGHTING": "光照",
	"FORM": "小区报表"
};

export default class menuAnalysis{
	constructor(){
		this.element = DomUtil.createElement('div','menu-bar', lang.ANALYSIS);

		var menuBar = DomUtil.createElement('div','menu-file',this.element);
		var importLighting = new ImportItem(lang.LIGHTING， IMPORTTYPE.LIGHTING);
		var importForm = new ImportItem(lang.FORM, IMPORTTYPE.FORM);

		DomUtil.appendChild(menuFile,[importLighting.element, importForm.element]);
	}
}