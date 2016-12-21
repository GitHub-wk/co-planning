// SetScaleComand.js
import Command from './Command.js';
export default class SetScaleCommand extends Command{
	constructor(object,newScale){
		super('setScale');
		this.object=object;
		if(object!==undefined&&newScale!==undefined)
		{
			this.oldScale=object.scale;
			this.newScale=newScale;
		}
	}
	execute(){
		if(this.object)
		{
			this.object.scale.copy(this.newScale);
			this.object.updateMatrixWorld( true );
		}
	}
}