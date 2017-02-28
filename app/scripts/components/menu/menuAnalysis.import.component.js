import {DomEvent,DomUtil} from '../../core/core.js';

export const ANALYSISTYPE = {
	"LIGHTING": 0,
	"FORM": 1
}

export class AnalysisItem{
	constructor(text, type, analysisFuc){
		this.element = DomUtil.createElement('div','item',text);
		DomEvent.on(this.element,'click',analysisFuc || function(){});
	}
}