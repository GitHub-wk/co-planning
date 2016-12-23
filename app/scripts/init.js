// init.js
//import {3dWorld} from './3dworld.js';
import worldFactory  from './worldFactory.js';
import {globalEvent} from './components/globalEvents.js';
import {DomEvent} from './core/core.js';
import {BuildingStore} from './dataservice/WorldStore';
import * as THREE from 'threejs';
import {BUILDING_CONSTS} from './dataservice/CONSTANTS.js';
import {infoInit,infoBuildingInit,layerTab,objectTab} from './InfoDefaultInit.js';
import {drawPanInit} from './DrawDefaultInit.js';
import './MenuDefaultInit.js';
import {Ground,GroundLayer} from './components/Layer/GroundLayer.js';
import {DRAWSIGNAL} from './components/draw/Draw.component.js';
import {LayerCollection} from './components/Layer/LayerCollection.js';
import {Layer} from './components/Layer/Layer.js';

var world=worldFactory.generateDefaultWorld();
console.log(world);

//layerCollection
var layerCollection=new LayerCollection();
world.addToScene(layerCollection.defaultLayer.object);


//groundLayer
var groundLayer=new GroundLayer();
groundLayer.resetWorld(world);
groundLayer.add(new Ground(500,'images/textures/ground_1.jpg'));
layerCollection.addLayer(groundLayer);

//buildingLayer-component for drawpan don't add building to view .
var buildingGroup=layerCollection.newLayer('建筑').object;
buildingGroup.name='buildingGroup';
layerCollection.setSelectedLayer(layerCollection.getLayerByName('建筑'));


world.addToScene(groundLayer,buildingGroup);
world.moveToLngLat({lng:114.35120420404286,lat:30.530716753548138});
BuildingStore.on(BUILDING_CONSTS.ADD,function(building){
    var selectedLayer=layerCollection.getSelectedLayer();
    selectedLayer.add(building);
    building.userData.layer=selectedLayer;
});
BuildingStore.on(BUILDING_CONSTS.COMMAND,function(command){
	command.execute();
});
BuildingStore.on(BUILDING_CONSTS.REMOVE,function(command){
    command.execute();
})


//drawpan-component
//drawpan only add data to buildingstore;
drawPanInit.resetWorld(world)
                .resetIntersectObjects([groundLayer.getInstance()])
                    .addTo(window.document.body);
layerCollection.addLayer(new Layer(drawPanInit.getDrawGroup(),'绘画'));


//info-component,any change in buildingstore should reset info
infoInit.resetWorld(world)
        .emptyIntersectObjects([buildingGroup,drawPanInit.getDrawGroup(),layerCollection.defaultLayer.object]);
layerTab.setLayers(layerCollection);
infoBuildingInit.setIntersectNames({'building':true});				
// infoDrawMeshInit.setIntersectNames({'drawpan_mesh':true,'featurePoints':true,'featureLine':true});
//when in drawMode should not has info


//TODO
world.signal.on(DRAWSIGNAL.WILLDRAW,function(){
	infoInit.turnOFFStatus();
});
world.signal.on(DRAWSIGNAL.DRAWDONE,function(){
	infoInit.turnONStatus();
});
require('./loadShape.js');



//emit globalEvents such as 'resize,rerender' 
DomEvent.addEventListener(window,'resize',function(e){
     globalEvent.emit('windowResize',e);
});                     
(function render(){
    requestAnimationFrame(render);
    globalEvent.emit('requestAmimationFrame');
})();