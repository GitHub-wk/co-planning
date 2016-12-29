// menuFile.import.component.js
import {DomEvent,DomUtil} from '../../core/core.js';
export const IMPORTTYPE={
	"BUILDING":0,
	"GREEN":1,
	"MODEL":2,
}
export class ImportItem{
	constructor(text,type){
		this.element=DomUtil.createElement('div','item',text);
		DomEvent.on(this.element,'click',function(){
			console.log(type);
		})
	}
}