 // menu.importdata.component.js
 import {DomEvent,DomUtil} from '../../core/core.js';
 import {AnalysisItem, ANALYSISTYPE} from './menuAnalysis.import.component.js';

var lang = {
	"ANALYSIS": "分析",

	"LIGHTING": "光照",
	"FORM": "小区报表"
};


export default class MenuAnalysis{
	constructor(){
		this.element = DomUtil.createElement('div','menu-bar', lang.ANALYSIS);

		var menuBar = DomUtil.create('div','menu-file',this.element);
		var importLighting = new AnalysisItem(lang.LIGHTING, ANALYSISTYPE.LIGHTING, lighting);
		var importForm = new AnalysisItem(lang.FORM, ANALYSISTYPE.FORM, form);

		DomUtil.appendChild(menuBar,[importLighting.element, importForm.element]);
	}
}


//analysisFunction.js
function lighting(){
	console.log('lighting function clicked');
}

function form(){
	console.log('form function clicked');
}