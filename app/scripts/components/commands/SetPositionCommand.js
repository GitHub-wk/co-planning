// SetPositionCommand.js
import Command from './Command.js'
export default class SetPositionCommand extends Command{
	constructor(object,newPosition){
		super('setPosition');
		this.object=object;
		if(object!==undefined&&newPosition!==undefined)
		{
			this.newPosition=newPosition;
			this.oldPosition=this.object.position;
		}

	}
	execute(){
		if(this.object)
		{
			this.object.position.copy(this.newPosition);
			this.object.updateMatrixWorld(true);
		}
	}
}