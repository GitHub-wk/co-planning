// MenuDefaultInit.js
import MenuFile from './components/menu/menuFile.component.js';
import {DomUtil,DomEvent} from './core/core.js';

var menuEle=document.getElementsByClassName('menu')[0];
console.log(menuEle);
//file
var fileMenu=new MenuFile();
console.log(fileMenu);
DomUtil.appendChild(menuEle,fileMenu.element);