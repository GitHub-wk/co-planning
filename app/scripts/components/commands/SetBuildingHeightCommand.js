// SetBuildingHeightCommand.js
import Command from './Command.js';
import {modifyBuildingHeight} from '../commonTool/buildingTool.js';
export default class SetBuildingHeightCommand extends Command{
	constructor(object,floorNum,floorHeight,signal)
	{
		super('set building height');
		if(object&&floorNum&&floorHeight)
		{
			this.object=object;
			this.oldFloorNum=object.userData.floorNum;
			this.oldFloorHeight=object.userData.floorHeight;
			this.newFloorNum=floorNum;
			this.newFloorHeight=floorHeight;
			this.signal=signal
		}
	}
	execute(){
		modifyBuildingHeight(this.object,this.newFloorHeight,this.newFloorNum);
		if(this.signal)
		{this.signal.emit('updateUI');}
	}
}