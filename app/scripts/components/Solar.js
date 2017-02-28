//Solar.js  -- use to create a solar which can create shadow
import { MercatorProjection } from '../geo/MercatorProjection.js';
import { SolarAngle } from '../geo/SolarAngle.js';

var dist = 10000;

var axios = require('axios');
axios.get('../../index.html')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });

  var path = require('path');
  console.log('=================path =========');
  console.log(path);
  console.log(path.resolve(__dirname));


export class Solar {
    constructor() {
        this.date = null;
        this.targetLatLng = null;
        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.name = 'solarLight';
        this.light.castShadow = true;
        this.light.shadow.camera.near = 1;
        this.light.shadow.camera.far = 20000;
        this.light.shadow.camera.right = 10000;
        this.light.shadow.camera.left = -10000;
        this.light.shadow.camera.top = 10000;
        this.light.shadow.camera.bottom = -10000;
        this.light.shadow.mapSize.width = 10000;
        this.light.shadow.mapSize.height = 10000;
        this.projection = new MercatorProjection();
    }

    showLight(date, latLng) {
        this.date = date;
        this.targetLatLng = latLng;
        var angle = new SolarAngle(this.date, this.targetLatLng).getSolarAngle();
        console.log(angle);
        if(angle.elevation <= 0){
        	return console.log(('here has no solar now'));
        }

        var deltaX = dist * Math.sin(angle.direction),
            deltaY = dist * Math.cos(angle.direction),
            deltaZ = dist * Math.sin(angle.elevation);
        var targetCoord = this.projection.lngLatToPoint(this.targetLatLng);
        this.light.target.position.set(targetCoord.x, targetCoord.y, 0);
        this.light.position.set(targetCoord.x + deltaX, targetCoord.y + deltaY, deltaZ);

    }




    // var solarLight = new THREE.DirectionalLight(0xffffff, 1);
    //    solarLight.castShadow = true;
    //    solarLight.shadowCameraVisible = true;
    //    solarLight.shadowCameraNear = 1;
    // solarLight.shadowCameraFar = 1000;
    // solarLight.shadowCameraFov = 30;
    // solarLight.shadowCameraVisible = true;


    //    solarLight.position.set( 0, 500, 500 );
    //    scene.add(solarLight);
    //    scene.add(new THREE.CameraHelper(solarLight.shadow.camera));
}
