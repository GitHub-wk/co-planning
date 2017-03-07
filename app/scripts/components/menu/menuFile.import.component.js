// menuFile.import.component.js
import { DomEvent, DomUtil } from '../../core/core.js';


export const IMPORTTYPE = {
    "BUILDING": 1,
    "GREEN": 2,
    "MODEL": 3,
}
export class ImportItem {
    constructor(text, type ,func) {
        this.element = DomUtil.createElement('div', 'item', text);
        
        DomEvent.on(this.element, 'click', function() {
            func(type);
        })
    }
}
