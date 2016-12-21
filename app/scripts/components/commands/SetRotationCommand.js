// SetRotationCommand.js
import Command from './Command.js';

export default class SetRotationCommand extends Command{
	constructor(object,newRotation){
		super('set rotation');
		this.object=object;
		if(this.object!==undefined&&newRotation!==undefined)
		{
			this.oldRotation=this.object.rotation;
			this.newRotation=newRotation;
		}
	}
	execute(){
		this.object.rotation.copy(this.newRotation);
		this.object.updateMatrixWorld(true);
	}
}