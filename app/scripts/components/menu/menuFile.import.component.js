// menuFile.import.component.js
import { DomEvent, DomUtil } from '../../core/core.js';

var dataarr = [{
    name: 'resource1',
    url: '123.json',
    type: 1
}, {
    name: 'resource2',
    url: '1232.json',
    type: 1
}, {
    name: 'resource3',
    url: '132.json',
    type: 1
}, {
    name: 'resource3',
    url: '132.json',
    type: 1
}, {
    name: 'resource3',
    url: '132.json',
    type: 1
}];

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
            // DomUtil.hasClass(resourcemodal.element, 'modal-display')  &&  DomUtil.removeClass(resourcemodal.element, 'modal-display');

            // var projectId = getLocalProjectId();
            // console.log(Object.assign(user.getUser(), { projectId }));
            // asynData('GetProjectDetail', Object.assign(user.getUser(), { projectId }),{type})
            //     .then(function(res) {
            //         console.log('modal info:', res);
            //         resourcemodal.setData(res.data.resources);
            //     },function(err){
            //         console.log('获取项目资源列表失败');
            //     })

            // DomUtil.toggleClass(resourcemodal.element, 'modal-display');
        })
    }
}
