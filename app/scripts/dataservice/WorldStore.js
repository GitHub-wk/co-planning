// WorldStore.js
// var AppDispatcher = require('../components/AppDispatcher');
// var EventEmitter = require('events').EventEmitter;
// var TodoConstants = require('../constants/TodoConstants');
// var assign = require('object-assign');
import AppDispatcher from '../components/AppDispatcher.js';
import {EventEmitter,assign} from '../core/core.js';
import {BUILDING_CONSTS} from './CONSTANTS.js';
import {buildingTOJSON} from '../components/commonTool/buildingTool.js';

var _buildings = {
  'VERSION':'0.0.1'
}; // collection of building items

/**
 * add a building item
 * @param {string} text The content of the TODO
 */
function create(building) {
  //id identify building
  building.userData.id=building.userData.id||building.uuid;
  _buildings[building.userData.id] = {
    dirty:true,
    mesh: building,
  };
  return true;
}
function modify(building){
  var id=building.userData.id;
  if(_buildings[id])
  {
    _buildings[id].dirty=true;
    return true;
  }
  else{ return false;}
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function remove(building) {
  var id=building.userData.id;
  if(_buildings[id])
  {
    _buildings[id].dirty=true;
    _buildings[id].remove=true;
    _buildings[id].mesh=null;
    return true;
  }
}

var BuildingStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    var buildings=[];
    for(var key in _buildings)
    {
      (key!=='VERSION')&&(buildings.push(_buildings[key].mesh));
    }
    return buildings;
  },
  toJson:function(){
    var geoJson={
      "type": "FeatureCollection",                                                                               
      "features": []}
    for(var key in _buildings)
    {
      var building=_buildings[key];
      if(key!=='VERSION'&&!building.remove)
      {
        geoJson.features.push(buildingTOJSON(building.mesh));
      }
    }
    return geoJson;
  },
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var building;
    switch(action.actionType) {
      case BUILDING_CONSTS.ADD:
        building = action.message;
        if (building&&create(building)) {
          console.log('create Building');
          BuildingStore.emit(BUILDING_CONSTS.ADD,building);
          BuildingStore.emit(BUILDING_CONSTS.CHANGE);
        }
        break;
      case BUILDING_CONSTS.COMMAND:
        var command=action.message;
        if(command&&modify(command.object))
        {
          console.log(command.name);
          BuildingStore.emit(BUILDING_CONSTS.COMMAND,command);
        }
        break;
      case BUILDING_CONSTS.REMOVE:
        var command=action.message;
        if(command&&remove(command.object))
        {
          console.log(command.name);
          BuildingStore.emit(BUILDING_CONSTS.REMOVE,command);
        }
    }
    return true; // No errors. Needed by promise in Dispatcher.
  }),

});

export {BuildingStore};