import { DomUtil, Util } from './core/core.js';
import resourceModal from './components/modal/resource.component.js';
import solarModal from './components/modal/solar.component.js';
import houseFormModal from './components/modal/houseForm.component.js';
import {Solar} from './components/Solar.js';
import {globalEvent} from './components/globalEvents.js';
import * as THREE from 'threejs';
import ko from 'knockout';

var bodyEl = DomUtil.getById("wrapper"),
    resourcemodal = new resourceModal(),
    solarmodal = new solarModal(),
    houseformmodal = new houseFormModal();

//choose resource and show it on the screen
resourcemodal.signal.on('addResource', function(res) {
    //TODO XR
    console.log('item is :', res);
})

//solarModal   show solar on the scene
solarmodal.signal.on('onSolar', function(res) {
    console.log('solar time:', new Date(res));
    var solar = new Solar();
    //DevTools,should be deleted in master
    var lightShadowCamera = new THREE.CameraHelper(solar.light.shadow.camera);
    solar.showLight(new Date(res), { lat: 30.530716753548138, lng: 114.35120420404286 });

    globalEvent.emit('addSolarToScreen',solar);
    // world.addToScene(solar.light, solar.light.target, lightShadowCamera);
})

//solarModal    remove solar on the scene
solarmodal.signal.on('offSolar',function(){
    globalEvent.emit('addSolarToScreen');
})

//asyn get all modal and append them on the DOM TREE
Promise.all([resourcemodal.asynGetDom(), solarmodal.asynGetDom(new Date()), houseformmodal.asynGetDom()])
    .then(function([resource, solar]) {
        bodyEl.appendChild(resourcemodal.element);
        bodyEl.appendChild(solarmodal.element);
        bodyEl.appendChild(houseformmodal.element);
        ko.applyBindings({ resourcemodal, solarmodal, houseformmodal}, bodyEl);
    })


export {
    resourcemodal,
    solarmodal,
    houseformmodal
};
