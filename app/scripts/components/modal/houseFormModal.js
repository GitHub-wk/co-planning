import { DomUtil, Util, EventEmitter } from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';

import ko from 'knockout';
import axios from 'axios';

var houseFormModal = null,
    houseFormViewModal = {
        closeModal:function(){
            houseFormModal.hide();
        },
    };

BootstrapModal.fromTemplateUrl('/scripts/components/modal/houseFormModal.html', { viewModel: houseFormViewModal })
.then(function(modal){
    houseFormModal = modal;
    houseFormModal.open = function(arr, type){
        houseFormModal.show();
    };
})

export { houseFormModal };



// export default class houseFormModal {
//     constructor() {
//         this.signal = new EventEmitter();
//     }

//     asynGetDom() {
//         var scope = this;
//         return axios['get']('/scripts/components/modal/views/houseFormModal.html').then(function(res) {
//             if (res.status == 200) {
//                 //TODO XR
//                 scope.closeModal = function() {
//                     DomUtil.toggleClass(scope.element, 'modal-display');
//                 };
//                 scope.element = DomUtil.createElement('div', 'data-modal', res.data);
//                 return scope;
//             }
//         }, function(err) {
//             console.log('err:', err)
//         })
//     }
// };
