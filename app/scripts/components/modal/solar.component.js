import { DomUtil, Util } from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';
import {Solar} from '../Solar.js';
import {globalEvent} from '../globalEvents.js';

import ko from 'knockout';
import axios from 'axios';

var solarModal = null,
    solarViewModal = {
        solarTime: ko.observable(new Date()),
        emitSolar: function() {
            solarModal.signal.emit('onSolar', this.solarTime());
            solarModal.hide();
        },
        offSolar: function() {
            solarModal.signal.emit('offSolar');
            solarModal.hide();
        },
        closeFn: function() {
            solarModal.hide();
        },
    };

BootstrapModal.fromTemplateUrl('/scripts/components/modal/views/solarModal.html', { viewModel: solarViewModal })
    .then(function(modal) {
        solarModal = modal;
        console.log('solar modal:', modal);
        solarModal.open = function(opts = {time:new Date()}) {
            solarViewModal.solarTime(opts.time);
            solarModal.show();
        };
        solarModal.signal.on('onSolar', function(res) {
            var solar = new Solar();
            //DevTools,should be deleted in master
            var lightShadowCamera = new THREE.CameraHelper(solar.light.shadow.camera);
            solar.showLight(new Date(res), { lat: 30.530716753548138, lng: 114.35120420404286 });

            globalEvent.emit('addSolarToScreen', solar);
            // world.addToScene(solar.light, solar.light.target, lightShadowCamera);
        })
    })

export { solarModal };

// export default class solarModal {
//     constructor() {
//         this.signal = new EventEmitter();
//     }

//     asynGetDom(date) {
//         var scope = this;
//         return axios['get']('/scripts/components/modal/views/solarModal.html')
//             .then(function(res) {
//                 if (res.status == 200) {
//                     scope.solarTime = ko.observable(date);
//                     scope.emitSolar = function() {
//                         scope.signal.emit('onSolar', scope.solarTime());
//                     };
//                     scope.offSolar = function() {
//                         scope.signal.emit('offSolar');
//                     }
//                     scope.closeModal = function() {
//                         DomUtil.toggleClass(scope.element, 'modal-display');
//                         console.log('close button clicked');
//                     };
//                     scope.element = DomUtil.createElement('div', 'data-modal', res.data);
//                     return scope;
//                 }
//             }, function(err) {
//                 console.log('err:', err)
//             })
//     }
// }
