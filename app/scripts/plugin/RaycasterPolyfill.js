// RaycasterPolyfill.js
import * as THREE from 'threejs';
// bug when in long distance racaster have low precision
THREE.Raycaster.prototype.setFromCameraHP=function(coords, camera){
	if ( (camera && camera.isPerspectiveCamera) ) {
			var tempCamera=camera.clone();
			tempCamera.position.set(0,0,0);
			tempCamera.updateMatrixWorld(true);
			this.ray.direction.set( coords.x, coords.y, 0.5 ).unproject(tempCamera).normalize();
			this.ray.origin.setFromMatrixPosition( camera.matrixWorld );

		} else if ( (camera && camera.isOrthographicCamera) ) {

			this.ray.origin.set( coords.x, coords.y, ( camera.near + camera.far ) / ( camera.near - camera.far ) ).unproject( camera ); // set origin in plane of camera
			this.ray.direction.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );

		} else {

			console.error( 'THREE.Raycaster: Unsupported camera type.' );

		}
}