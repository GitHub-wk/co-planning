// MenuDefaultInit.js
import MenuFile from './components/menu/menuFile.component.js';
import MenuAnalysis from './components/menu/menuAnalysis.component.js';
import {DomUtil,DomEvent} from './core/core.js';
import {socket} from './socket/socket.js';
import {BuildingStore} from './dataservice/WorldStore.js';
//

var menuEle=document.getElementsByClassName('menu')[0];
//user
var userEle = DomUtil.createElement('span', 'menu-bar','');
var imgEl=DomUtil.create('img','',userEle);
imgEl.src='http://172.16.102.186:8082/img/noPic.jpg';
DomUtil.appendChild(menuEle,userEle);
//file
var fileMenu=new MenuFile();

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