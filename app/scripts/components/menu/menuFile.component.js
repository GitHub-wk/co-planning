 // menu.importdata.component.js
 import { DomEvent, DomUtil } from '../../core/core.js';
 import { ImportItem, IMPORTTYPE } from './menuFile.import.component.js';
 import {resourceModal} from '../modal/resource.component.js';
 import { user, asynData, getLocalProjectId }  from '../../dataservice/CommonDatabase.js';

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
         console.log(this.element);
         var menuFile = DomUtil.create('div', 'menu-file', this.element);
         var importText = DomUtil.createElement('div', 'item item-text', lang.IMPORT);
         var importBuilding = new ImportItem(lang.BUILDING, IMPORTTYPE.BUILDING, readFile);
         var importGreen = new ImportItem(lang.GREEN, IMPORTTYPE.GREEN, readFile);
         var importModel = new ImportItem(lang.MODEL, IMPORTTYPE.MODEL, readFile);
         DomUtil.appendChild(menuFile, [importText, importBuilding.element, importGreen.element, importModel.element]);
     }
 }

 var resource =[
        {
            "type":"1",
            "url":"21038921.json",
            "name":"建筑1",
            "faceImg":"图1片"
        },{
            "type":"1",
            "url":"21038921.json",
            "name":"建筑1",
            "faceImg":"图1片"
            
        }
    ];

 function readFile(type) {
     var projectId = getLocalProjectId();
     asynData('GetProjectDetail', Object.assign(user.getUser(), { projectId }), { type })
         .then(function(res) {
             resourceModal.open(res.data.resources);
         }, function(err) {
             console.log('获取项目资源列表失败');
             //TOD XR TEST
              resourceModal.open(resource, type);
         })

 }
