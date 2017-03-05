import { DomUtil, Util ,EventEmitter} from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';
import { addResourceModal } from './addResource.component.js';
import ko from 'knockout';
import axios from 'axios';

var resourceModal = null,
    resourceViewModal = {
        resourceList: ko.observableArray([]),
        type: ko.observable(''),
        loadResource: function(item){
            resourceModal.signal.emit('loadResource',item);
        },
        addResource: function(){
            resourceModal.signal.emit('addResource');
            console.log('add new resource');
        },
        closeModal: function(){
            resourceModal.hide();
        }
    }

BootstrapModal.fromTemplateUrl('/scripts/components/modal/views/resouceModal.html', { viewModel: resourceViewModal })
.then(function(modal){
    resourceModal = modal;
    resourceModal.open = function(arr, type){
            console.log('type',type);
        
        resourceViewModal.resourceList(arr);
        resourceViewModal.type(type);
        resourceModal.show();
    };
    resourceModal.signal.on('loadResource',function(item){
        console.log('chosen item',item);
    });
    resourceModal.signal.on('addResource',function(){
        console.log('add resource');
        resourceModal.hide();
        addResourceModal.open( resourceViewModal.type());
    })
})

export { resourceModal };

// export default class resourceModal {
//     constructor() {
//         this.signal = new EventEmitter();
//     }

//     asynGetDom(arr = []) {
//         var scope = this;
//         return axios['get']('/scripts/components/modal/views/resouceModal.html').then(function(res) {
//             if (res.status == 200) {
//                 scope.dataArr = ko.observableArray(arr);
//                 scope.loadResource = function(item){
//                 	scope.signal.emit('addResource',item);
//                 	console.log('clicked button',item);
//                 };
//                 scope.closeModal = function(){
//                 	DomUtil.toggleClass(scope.element, 'modal-display');
//                 };
//                 scope.element = DomUtil.createElement('div', 'data-modal', res.data);
//                 return scope;
//             }
//         }, function(err) {
//             console.log('err:', err)
//         })
//     }

//     setData(arr){
//     	this.dataArr(arr);
//     }
// };
