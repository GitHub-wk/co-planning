import { DomUtil, Util } from '../../core/core.js';
import { EventEmitter } from '../../core/core.js';
import ko from 'knockout';
import axios from 'axios';

//xr

export default class resourceModal {
    constructor(first, last) {
        this.signal = new EventEmitter();
    }

    asynGetDom(arr) {
        var scope = this;
        return axios['get']('/scripts/components/modal/views/resouceModal.html').then(function(res) {
            if (res.status == 200) {
                console.log('data array:', arr);
                scope.dataArr = ko.observableArray(arr);
                scope.loadResource = function(item){
                	scope.signal.emit('addResource');
                }

                scope.element = DomUtil.createElement('div', 'data-modal', res.data);

                return scope;
            }
        }, function(err) {
            console.log('err:', err)
        })
    }

    setData(first, last) {

        console.log('setdata');
    }
};
