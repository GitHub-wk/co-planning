// menuFile.import.component.js
import { DomEvent, DomUtil } from '../../core/core.js';

export const IMPORTTYPE = {
    "BUILDING": 1,
    "GREEN": 2,
    "MODEL": 3,
}
export class ImportItem {
    constructor(text, type) {
        this.element = DomUtil.createElement('div', 'item', text);        
    }
}
