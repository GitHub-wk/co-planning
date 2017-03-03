import { DomUtil, Util ,EventEmitter} from '../../core/core.js';
import ko from 'knockout';
import axios from 'axios';

export default class solarModal{
	constructor(){
		this.signal = new EventEmitter();
	}

	asynGetDom(date){
		var scope = this;
		return axios['get']('/scripts/components/modal/views/solarModal.html')
		.then(function(res){
			if(res.status == 200){
				scope.solarTime = ko.observable(date);
				scope.emitSolar = function(){
					scope.signal.emit('onSolar',scope.solarTime());
				};
				scope.offSolar = function(){
					scope.signal.emit('offSolar');
				}
				scope.closeModal = function(){
                	DomUtil.toggleClass(scope.element, 'modal-display');
                	console.log('close button clicked');
                };
                scope.element = DomUtil.createElement('div', 'data-modal', res.data);
				return scope;
			}
		}, function(err) {
            console.log('err:', err)
        })
	}

}