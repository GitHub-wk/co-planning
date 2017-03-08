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
        },
        offSolar: function() {
            globalEvent.emit('addSolarToScreen');
            
            solarModal.hide();
        },
        closeFn: function() {
            solarModal.hide();
        },
    };

BootstrapModal.fromTemplateUrl('/scripts/components/modal/solarModal.html', { viewModel: solarViewModal })
    .then(function(modal) {
        solarModal = modal;
        solarModal.open = function(opts = {time:new Date()}) {
            solarViewModal.solarTime(opts.time);
            solarModal.show();
        };
        solarModal.signal.on('onSolar', function(res) {
            var solar = new Solar();
            //DevTools,should be deleted in master
            var lightShadowCamera = new THREE.CameraHelper(solar.light.shadow.camera);
            solar.showLight(new Date(res), { lat: 30.530716753548138, lng: 114.35120420404286 }) && solarModal.hide();

            globalEvent.emit('addSolarToScreen', solar);
            // world.addToScene(solar.light, solar.light.target, lightShadowCamera);
        })
    })

export { solarModal };

