// guiControl.js

import * as plugin from '../plugin/plugin.js';
import {globalEvent} from './globalEvents.js';
import {DomUtil} from '../core/core.js';
/**
 * @class [control for all gui]
 */
export class GuiControl{
   	constructor(){
        this.gui=new plugin.dat.GUI();
        this.gui.close();
   	}
      /**
       * @description addlightControl
       */
   	addLightControl(light)
   	{
   		this._lightControlInit=false;
   		if(!this._lightControlInit)
   		{
   			var step=0;
   			var lightControls=this.lightControls={lightspeed:0.0}
	   		this.gui.add(this.lightControls,'lightspeed',0,0.5);
	   		globalEvent.on('requestAmimationFrame',function(){
	   			step +=lightControls.lightspeed;
			    if (step > 314) { 
			    	console.log(step); step -= 314 
			    };
			    light.position.setX(250 * Math.sin(step));
			    light.position.setY(250 * Math.cos(step));
	   		});
	   		this._lightControlInit=true;
   		}
      return this;           
   	}
      /**
       * @description  add Stats monitor
       */
      addStatsMonitor(eleId)
      {
         this._statsMonitorInit=false;
         if(!this._statsMonitorInit)
         {
            var ele=DomUtil.getById(eleId);
            var stats=this.statsMonitor= new plugin.Stats();
            stats.setMode(0);
            ele.appendChild(stats.domElement);
            globalEvent.on('requestAmimationFrame',function(){
               stats.update();
            })
         }
         this._statsMonitorInit=true;
      }
}