import { DomUtil, Util } from '../../core/core.js';
import ko from 'knockout';
//xr

export default class userModal{
    constructor(first,last) {
        this.firstName = ko.observable(first);
        this.lastName = ko.observable(last);

        this.fullName = ko.pureComputed(function() {
            // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
            return this.firstName() + " " + this.lastName();
        }, this);

        this.element = DomUtil.createElement('div', 'user-modal', `
				<div style="width:200px;height:200px;background-color:#fff;">
					<p>First name: <input data-bind="value: firstName" /></p>
					<p>Last name: <input data-bind="value: lastName" /></p>
					<h2>Hello, <span data-bind="text: fullName"> </span>!</h2>
				</div>
			`);
    }
};
