//xr
import { DomUtil, Util } from './core/core.js';
import resourceModal from './components/modal/resource.component.js';
import ko from 'knockout';



var bodyEl = DomUtil.getById("wrapper");

var dataarr = [{
	name:'resource1',
	url:'123.json',
	type:1
},{
	name:'resource2',
	url:'1232.json',
	type:1
},{
	name:'resource3',
	url:'132.json',
	type:1
}];


//xr
var modal = new resourceModal(),
	resourceElement = null;
modal.asynGetDom(dataarr).then(function(res){
	console.log(res);
	modal.element = res.element;
	bodyEl.appendChild(modal.element );
	ko.applyBindings(res);
})

modal.signal.on('addResource',function(res){
	console.log('firstName is :',res);
	modal.setData('stargers','ssss');
})

export {modal};

