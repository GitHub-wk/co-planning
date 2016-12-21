// draggabel.js
import {DomEvent,DomUtil} from './core.js';

/**
 * [MOUSESTATS make element can be drag]
 * @type {Object}
 */
var MOUSESTATS={
    'OFF':0,
    'CLICKED':1,
}
export class Draggable{
	constructor(ele){
		this.element=ele;
		this.element._draggable=true;
		this.element._mousestats=MOUSESTATS.OFF;
		var offsetPosition={x:0,y:0};
		DomEvent.on(this.element,'mousedown',function(e){
			if(this._draggable){				
				this._mousestats=MOUSESTATS.CLICKED;
				offsetPosition.x=e.offsetX;
				offsetPosition.y=e.offsetY;
			}
		});
		DomEvent.on(this.element,'mousemove',function(e){
			//avoid bug when e don't move but mousemove will run.such as click
			if(this._mousestats===MOUSESTATS.CLICKED&&(e.movementX!==0||e.movementY!==0))
			{			
				this.style.right='auto';
				this.style.bottom='auto';
				this.style.left = e.clientX-20 + 'px';
			    this.style.top = e.clientY-20 + 'px';
			}
		});
		DomEvent.on(this.element,'mouseup',function(e){
			this._mousestats=MOUSESTATS.OFF;
		});

	}
	enable(){
		this.element._draggable=true;         
	}
	disable(){
		this.element._draggable=false;
	}
}