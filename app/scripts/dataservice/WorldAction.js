// WorldAction.js
import AppDispatcher from '../components/AppDispatcher.js';
import {BUILDING_CONSTS} from './CONSTANTS.js';
/**
 * [BuildingAction ]
 * @type {Object}
 * @description messagetype:{actionType:string,message}
 */
var BuildingAction={
	add:function(building){
		AppDispatcher.handleViewAction({actionType:BUILDING_CONSTS.ADD,message:building});
	},
	remove:function(building)
	{
		AppDispatcher.handleViewAction({actionType:BUILDING_CONSTS.REMOVE,message:building});
	},
	modify:function(building){
		AppDispatcher.handleViewAction({actionType:BUILDING_CONSTS.MODIFY,message:building});
	},
	command:function(building){
		AppDispatcher.handleViewAction({actionType:BUILDING_CONSTS.COMMAND,message:building});
	},
	removeAll:function(){
		AppDispatcher.handleViewAction({actionType:BUILDING_CONSTS.REMOVEALL,message:''});
	},
}
export {BuildingAction};