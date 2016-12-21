// LayerCollection.js
import * as THREE from 'threejs';
import {Layer} from './Layer.js';
export class LayerCollection{
	constructor(){
		this.layers=[];
		var defaultObject=new THREE.Group();
		defaultObject.name='default';
		this.defaultLayer=new Layer(defaultObject,'默认').setDeleteable(false);
		this.layers.push(this.defaultLayer);
	}
	addLayer(layer)
	{
		if(this.getLayerByName(layer.name))
		{
			return false;
		}
		this.layers.push(layer);
		return true;
	}
	setSelectedLayer(layer)
	{
		var layers=this.getLayers();
		for(var i=0;i<layers.length;i++)
		{
			layers[i].selected=false;
			if(layer===layers[i]&&layer.selectable)
			{
				layer.selected=true;
			}
		}
	}
	getSelectedLayer(){
		var layers=this.getLayers();
		for(var i=0;i<layers.length;i++)
		{
			if(layers[i].selected&&layers[i].selectable)
			{
				return layers[i];
			}
		}
		return this.defaultLayer;
	}
	newLayer(name)
	{
		if(this.getLayerByName(name)){
			return null;
		}
		var object=new THREE.Group();
		object.name=name;
		var layer=new Layer(object,name);
		this.layers.push(layer);
		return layer;
	}
	getLayers(){
		return this.layers;
	}
	getLayerByName(name){
		for(var i=0;i<this.layers.length;i++)
		{
			if(this.layers[i].name===name)
			{
				return this.layers[i];
			}
		}
		if(name===''||name===undefined||name===null)
		{
			return true;
		}
		return null;
	}
}