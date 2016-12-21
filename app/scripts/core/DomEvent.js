// DomEvent.js
/**
 * @author wk
 * @description dom event operation
 * @{@link 'https://github.com/Leaflet/Leaflet/blob/master/src/dom/DomEvent.js'}
 */
import Util from './Util.js';
var DomEvent={
	/**
	 * [addEventListener add even listener to dom]
	 * @param {Element}   obj        [Element]
	 * @param {string}   type       [event type such as 'click']
	 * @param {Function} fn         [function to fire]
	 * @param {boolean}   useCapture [description]
	 * @return {object} [DomEvent obj]
	 */
	addEventListener:function(obj,type,fn,useCapture){
		if('addEventListener' in obj)
		{
			obj.addEventListener(type,fn,useCapture||false);
		}
		else if('attachEvent' in obj)
		{
			obj.attachEvent('on'+type,fn);
		}
		return this;
	},

	/**
	 * [removeEventListener remove the listener]
	 */
	removeEventListener:function (obj,type,fn,useCapture) {
		if('removeEventListener' in obj)
		{
			obj.removeEventListener(type,fn,useCapture||false);
		}
		else if('detachEvent' in obj)
		{
			obj.detachEvent(type,fn);
		}
		return this;
	},

	/**
	 * [stopPropagation ]
	 * @param  {[Event]} e [the event]
	 * @return {[Object]}   [description]
	 */
	stopPropagation:function(e) {
		e=e||window.event;
		if(e.stopPropagation)
		{
			e.stopPropagation();
		}
		else{
			e.cancelBubble=true;
		}
		return this;
	},

	/**
	 * [preventDefault description]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	preventDefault:function(e) {
		e=e||window.event;
		if(e.preventDefault)
		{
			e.preventDefault();
		}
		else{
			e.returnValue=false;
		}
		return this;
	},

	/**
	 * [stop preventDefault add stopPropagation]
	 * @param  {[Event]} e [event]
	 * @return {[object]}   [this]
	 */
	stop:function (e) {
		e=e||window.event;
		this.preventDefault(e)
			.stopPropagation(e);
		return this;
	},

};

//shorcut
(function () {
	DomEvent.on=DomEvent.addEventListener;
	DomEvent.off=DomEvent.removeEventListener;
})()

export default DomEvent;