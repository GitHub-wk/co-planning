// InfoScene.component.js
import {DomUtil,Util,DomEvent,EventEmitter} from '../../core/core.js';
import {confirmModal} from '../commonTool/modalTool.js';


var UI=DomUtil.UI;
export default class InfoLayer{
	constructor(layerCollection){
		this.signal=new EventEmitter();
		this.element=DomUtil.createElement('div','info-layer','this is layer');
		layerCollection&&this.setLayers(layerCollection);
	}
	setLayers(layerCollection)
	{
		DomUtil.empty(this.element);
		var panel=new UI.Panel().setClass('layer-pan');
		var layers=layerCollection.getLayers();
		var rowCollection=[];
		var signal=this.signal;
		for(var i=0;i<layers.length;i++)
		{
			var layer=layers[i];
			if(layer.name)
			{
				var row=new UI.Row().setClass('layer-item');
				rowCollection.push(row);
				row.add(new UI.Text(layer.name).setWidth('90px'));
				var trashButton=new UI.Span().setClass('iconfont icon-trash').setStyle('float',['right']);
				var eyeButton=new UI.Span().setClass('iconfont icon-eye').setStyle('float',['right']);
				var bulbButton=new UI.Span().setClass('iconfont icon-bulb').setStyle('float',['right']);
				row.add(trashButton,bulbButton,eyeButton);
				panel.add(row);
				//delete
				var trashClick=(function(layer,trashButton){
					return function(){
								if(!layer.clearable) 
									{
										alert('不可清除！');
										return false;
									}
								confirmModal.show({
									content:'确认清除此图层？(删除后不可复原！)',
									callback:function(flag){
										if(flag){
											// layer.clear();
											signal.emit('clear',layer);
										}
									}
								});
								DomEvent.stop();
							}
				})(layer,trashButton);
				//visible
				var eyeClick=(function(layer,eyeButton){
					return function(){								
								layer.toggleVisible()?DomUtil.removeClass(eyeButton.dom,'unselected'):DomUtil.addClass(eyeButton.dom,'unselected');
								signal.emit('toogleVisible',layer);
								DomEvent.stop();
							}
				})(layer,eyeButton);
				//visibleall
				var bulbClick=(function(layer,bulbButton){
					return function(){
								// layer.visibleAllChild();
								signal.emit('visibleall',layer);
								DomEvent.stop();
							}
				})(layer,bulbButton);
				var rowClick=(function(layer,row){
					return function(){
								if(layer.selectable)
								{
									Util.forEach(rowCollection,function(row){
									DomUtil.removeClass(row.dom,'selected');
									});							
									layerCollection.setSelectedLayer(layer);
									DomUtil.addClass(row.dom,'selected');
									signal.emit('selectLayer',layerCollection.getSelectedLayer());									
								}
							}
				})(layer,row);
				trashButton.onClick(trashClick);
				bulbButton.onClick(bulbClick);
				eyeButton.onClick(eyeClick);
				row.onClick(rowClick);
			}
		}
		DomUtil.appendChild(this.element,panel.dom);
	}

}
