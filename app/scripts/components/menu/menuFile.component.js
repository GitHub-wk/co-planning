 // menu.importdata.component.js
 import { DomEvent, DomUtil } from '../../core/core.js';
 import { ImportItem, IMPORTTYPE } from './menuFile.import.component.js';
 var lang = {
     "FILE": '文件',
     'IMPORT': '导入',
     'BUILDING': '建筑',
     'GREEN': '绿化',
     'MODEL': '模型',
 }
 export default class MenuFile {
     constructor() {
         this.element = DomUtil.createElement('span', 'menu-bar', lang.FILE);
         var menuFile = DomUtil.create('div', 'menu-file', this.element);
         var importText = DomUtil.createElement('div', 'item item-text divider', lang.IMPORT);
         this.importBuilding = new ImportItem(lang.BUILDING, IMPORTTYPE.BUILDING);
         this.importModel = new ImportItem(lang.MODEL, IMPORTTYPE.MODEL);
         DomUtil.appendChild(menuFile, [importText, this.importBuilding.element,this.importModel.element]);
     }
 }

