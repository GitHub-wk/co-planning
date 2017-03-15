import { DomUtil, Util } from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';
import {Solar} from '../Solar.js';
import {globalEvent} from '../globalEvents.js';

import ko from 'knockout';
import axios from 'axios';

var now = new Date();

var solarModal = null,
    solarViewModal = {
        solarTime: ko.observable(''),
        year:ko.observable(now.getFullYear()),
        month:ko.observable(now.getMonth() + 1),
        day:ko.observable(now.getDate()),
        hour:ko.observable(now.getHours()),
        min:ko.observable(now.getMinutes()),
        setToCurrent:function(){
            var now = new Date();
            this.year(now.getFullYear());
            this.month(now.getMonth() + 1);
            this.day(now.getDate());
            this.hour(now.getHours());
            this.min(now.getMinutes());
        },
        emitSolar: function() {
            var _year = this.year(),
                _month = this.month(),
                _day = this.day(),
                _hour = this.hour(),
                _min = this.min();
            console.log('time :',new Date(_year,_month - 1, _day, _hour, 0));

            solarModal.signal.emit('onSolar',{time:new Date(_year,_month - 1, _day, _hour, 0)});
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
        solarModal.open = function() {
            solarModal.show();
        };
        solarModal.signal.on('onSolar', function(res) {
            var solar = new Solar();
            //DevTools,should be deleted in master
            var lightShadowCamera = new THREE.CameraHelper(solar.light.shadow.camera);
            solar.showLight(res.time, { lat: 30.530716753548138, lng: 114.35120420404286 }) && solarModal.hide();

            globalEvent.emit('addSolarToScreen', solar);
            // world.addToScene(solar.light, solar.light.target, lightShadowCamera);
        })
    })

export { solarModal };

