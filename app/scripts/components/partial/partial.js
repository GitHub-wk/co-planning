// partial.js
import ko from 'knockout';
import axios from 'axios';
import DomUtil from '../../core/DomUtil.js';
function parseFromUrl(url,viewModel,container) {
	return axios.get(url).then(function(res){
		var html=res.data;
		var dom=DomUtil.parseDom(html);
		if(viewModel)
		{
			ko.applyBindings(viewModel,dom);
		}
		if(container)
		{
			DomUtil.appendChild(container,dom);
		}
		return dom;
	},function(error){
	 throw new Error('not found:'+url);
	});
}
function parseFromHtml(){
	
}
export {parseFromUrl};