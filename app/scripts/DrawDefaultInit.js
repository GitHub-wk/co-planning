// DrawDefaultInit.js
import DrawPan from './components/draw/Draw.component.js';
import DrawLine from './components/draw/DrawLine.component.js';
import DrawClose from './components/draw/DrawClose.component.js';
import DrawExtrude from './components/draw/DrawExtrude.component.js';
import DrawExit from './components/draw/DrawExit.component.js';
import DrawBack from './components/draw/DrawBack.component.js';
import DrawClear from './components/draw/DrawClear.component.js';
import DrawSpline from './components/draw/DrawSpline.component.js';
import DrawSelect from './components/draw/DrawSelect.component.js';
import {Draggable} from './core/core.js';
//data service
import {BuildingAction} from './dataservice/WorldAction.js';
require('./components/draw/Draw.component.less');

var drawPanInit=new DrawPan();
new Draggable(drawPanInit.element);
drawPanInit.addChild(DrawLine.defaultInit)
			.addChild(DrawSpline.defaultInit)
			.addChild(DrawClose.defaultInit)
			.addChild(DrawExtrude.defaultInit)
			.addChild(DrawSelect.defaultInit)
			.addChild(DrawBack.defaultInit)
			.addChild(DrawClear.defaultInit)
			.addChild(DrawExit.defaultInit);

//ADD Data access layer
DrawExtrude.defaultInit.setAfterDrawFunction(function(building){
	BuildingAction.add(building);
})
export {drawPanInit};