import { DomUtil, Util ,EventEmitter} from '../../core/core.js';
import ko from 'knockout';
import axios from 'axios';

export default class resourceModal {
    constructor() {
        this.signal = new EventEmitter();
    }

    asynGetDom(arr = []) {
        var scope = this;
        return axios['get']('/scripts/components/modal/views/resouceModal.html').then(function(res) {
            if (res.status == 200) {
                scope.dataArr = ko.observableArray(arr);
                scope.loadResource = function(item){
                	scope.signal.emit('addResource',item);
                	console.log('clicked button',item);
                };
                scope.closeModal = function(){
                	DomUtil.toggleClass(scope.element, 'modal-display');
                };
                scope.element = DomUtil.createElement('div', 'data-modal', res.data);
                return scope;
            }
        }, function(err) {
            console.log('err:', err)
        })
    }

    setData(arr){
    	this.dataArr(arr);
    }
};
