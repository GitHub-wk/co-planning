// RemoveObjectCommand.js
import Command from './Command.js';

export default class RemoveObjectCommand extends Command{
	constructor(object,signal){
		super('remove object');
		this.parent=object.parent;
		this.object=object;
		this.signal=signal;
	}
	execute(){
		this.parent.remove(this.object);
		if(this.signal)
		{
			this.signal.emit('refresh',[]);
		}
	}
}