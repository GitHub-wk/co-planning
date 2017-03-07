// setMaterialCommand.js
import Command from './Command.js';
import {resourceFilter} from '../../dataservice/config.js';
import * as THREE from 'threejs';

export default class SetMaterialCommand extends Command{
	constructor(object,newMaterial){
		super('setMaterial');
		if(object&&newMaterial)
		{
			this.object=object;
			this.oldMaterial=this.object.userData.materialUrl;
			this.newMaterial=newMaterial;
		}
	}
	execute(){
		if(this.object)
		{
		    var texture = new THREE.TextureLoader().load(resourceFilter(this.newMaterial));
		    texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			this.object.material.materials[1].map=texture;
			this.object.userData.materialUrl=this.newMaterial;
		}
	}
}