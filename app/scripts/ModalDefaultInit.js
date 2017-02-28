//xr
import { DomUtil, Util } from './core/core.js';
import userModal from './components/modal/user.component.js';
import ko from 'knockout';

//xr
var modal = new userModal('xu','rui');
var bodyEl = DomUtil.getById("wrapper");
bodyEl.appendChild(modal.element);
ko.applyBindings(modal);
console.log('============================');


