// menuFile.import.component.js
import { DomEvent, DomUtil } from '../../core/core.js';
import { modal } from '../../ModalDefaultInit.js';
import {user,asynData} from '../../dataservice/CommonDatabase.js';


export const IMPORTTYPE = {
    "BUILDING": 0,
    "GREEN": 1,
    "MODEL": 2,
}
export class ImportItem {
    constructor(text, type) {
        this.element = DomUtil.createElement('div', 'item', text);
        DomEvent.on(this.element, 'click', function() {
            console.log(type);
            console.log(modal.element);
            modal.setData('stargers','ssss');

            DomUtil.toggleClass(modal.element, 'modal-display');

            asynData('GetProjectList', user.getUser())
                .then(function(res) {
                    console.log('modal info:', res);
                })

        })
    }
}
