// MenuDefaultInit.js
import MenuFile from './components/menu/menuFile.component.js';
import MenuAnalysis from './components/menu/menuAnalysis.component.js';
import {DomUtil,DomEvent} from './core/core.js';
import {socket} from './socket/socket.js';
import {BuildingStore} from './dataservice/WorldStore.js';
import {BuildingAction} from './dataservice/WorldAction.js';
import {resourceModal,RESOURCETYPE} from './components/modal/resourceModal.js';
import axios from 'axios';
import {resourceFilter} from './dataservice/config.js';
import {jsonToBuilding} from './components/commonTool/buildingTool.js';
//

var menuEle=document.getElementsByClassName('menu')[0];
//user
var userEle = DomUtil.createElement('span', 'menu-bar','');
var imgEl=DomUtil.create('img','',userEle);
imgEl.src='http://172.16.102.186:8082/img/noPic.jpg';
DomUtil.appendChild(menuEle,userEle);
//file
var fileMenu=new MenuFile();
DomEvent.on(fileMenu.importBuilding.element,'click',function(){
	resourceModal.open({
		type:RESOURCETYPE.BUILDING,
		callBack:function(resource){
			console.log(resource);
			axios.get(resourceFilter(resource.url))
				.then(function(res){
					if(res.status!==200) return false;
					var projectData=res.data;
					for(var i=0;i<projectData.features.length;i++)
					{

						if(i===27){console.log(projectData.features[i])}
						var buildingMesh=jsonToBuilding(projectData.features[i]);
						BuildingAction.add(buildingMesh);
					}
				})
		}
	})
})
DomEvent.on(fileMenu.importModel.element,'click',function(){
	resourceModal.open({
		type:RESOURCETYPE.MODAL,
		callBack:function(resource){
			console.log(resource);
		}
	})
})
DomUtil.appendChild(menuEle,fileMenu.element);

//analysis 
var analysisMenu = new MenuAnalysis();
DomUtil.appendChild(menuEle, analysisMenu.element);


//test refersh
//TODO
var refreshEl= DomUtil.createElement('span','menu-bar','刷新');
DomUtil.appendChild(menuEle,refreshEl);
DomEvent.on(refreshEl,'click',function(){
	console.log('refersh click');
	var json=BuildingStore.toJson();
	socket.emit('refresh',json);
});