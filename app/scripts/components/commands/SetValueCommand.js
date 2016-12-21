// SetValueCommand.js
import Command from './Command.js';

export default class SetValueCommand extends Command{
	constructor(object,attributeName,newValue){
		super('set value'+attributeName);
		this.object=object;
		if(this.object!==undefined&&attributeName!==undefined&&newValue!==undefined)
		{
			this.attributeName=attributeName;
			this.oldValue=this.object[attributeName];
			this.newValue=newValue;
		}
	}
	execute(){
		this.object[this.attributeName]=this.newValue;
	}
}