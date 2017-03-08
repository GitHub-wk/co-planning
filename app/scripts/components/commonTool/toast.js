import ko from 'knockout';
import axios from 'axios';
import './toast.less';
import { DomUtil, Util } from '../../core/core.js';

var positionOptions = {
        TOPRIGHT: 'top-right',
        TOPLEFT: 'top-left',
        BOTTOMRIGHT: 'bottom-right',
        BOTTOMLEFT: 'bottom-left'
    },
    typeOptions = {
    	DANGER:'danger',
    	SUCCESS:'success',
    	WARNING:'warning',
    },
    prevToast = {
        'top-right': [],
        'top-left': [],
        'bottom-right': [],
        'bottom-left': [],
    },
    defaultOpts = {
        position: 'top-right',
    },
    partLen = 60;

export default class Toast {
    constructor(html, opts) {
        this.dom = html;
        this.opts = opts;
        this.count = 1;
    }
    show() {
        var scope = this,
        	len = prevToast[this.opts.position].length;
        Util.forEach(prevToast[this.opts.position], function(value, index) {
            value.move();
        })
        DomUtil.appendChild(document.body, this.dom);
        prevToast[this.opts.position].push(this);

        setTimeout(this.hide.bind(this), 2500);
    }
    hide() {
        DomUtil.remove(this.dom);
        prevToast[this.opts.position].shift();
    }
    move(index) {
    	var dire = (this.opts.position == positionOptions.TOPRIGHT) || 
    	(this.opts.position == positionOptions.TOPLEFT) ? 1 : -1;
        DomUtil.setTransform(this.dom, { x: 0, y: partLen * this.count++ * dire });
    }
}

Toast.info = function(opts = {}) {
    var toastViewModal = {
        text: ko.observable(''),
        position: ko.observable(''),
        type: ko.observable(''),
    }
    toastViewModal.setStyle = ko.pureComputed(function() {
    	console.log('setposition');
    	var _position = '',
    		_type = '';

        switch (this.position()) {
            case positionOptions.TOPRIGHT:
               _position = 'top-right';
                break;
            case positionOptions.BOTTOMRIGHT:
               _position = 'bottom-right';
                break;
            case positionOptions.TOPLEFT:
               _position = 'top-left';
                break;
            case positionOptions.BOTTOMLEFT:
               _position = 'bottom-left';
                break;
        }

        _type = toastViewModal.type();
        return _position + ' ' + _type;
        
    }, toastViewModal);

    toastViewModal.text(opts.text || 'default text');
    toastViewModal.position(opts.position || 'top-right');
    toastViewModal.type(opts.type || 'success');

    var toastEl = DomUtil.parseDom(`<div class="info" data-bind="css: setStyle">
										<span class="info-text" data-bind="text:text"></span>
									</div>`);
    ko.applyBindings(toastViewModal, toastEl);

    return new Toast(toastEl, opts);
}
