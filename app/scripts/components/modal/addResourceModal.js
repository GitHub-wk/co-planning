// addResourceModal.js
import { DomUtil, Util } from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';
import { user, asynData, getLocalProjectId } from '../../dataservice/CommonDatabase.js';
import { Toast } from '../commonTool/commonTool.js';
import ko from 'knockout';
import axios from 'axios';


var _addResourceModal = null;
var addResourceViewModal = {
    type: ko.observable(''),
    headerText:ko.observable('新增'),
    resourceName: ko.observable(''),
    resourceFile: '',
    resourceImg: '',
    closeModal: function() {
        _addResourceModal.hide();
    },
    addResource: function() {},
    upload: function(id) {
        var data = new FormData();
        var config = {
                onUploadProgress: function(progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(percentCompleted);
                }
            },
            file = document.getElementById(id).files[0];
        console.log(file);
        if (!file) {
             return  Toast.info({
                text: '请先选择文件',
                position: 'top-right',
                type: 'warning'
            }).show();
        }
        data.append('file', file);
        axios.put('http://172.16.102.186:8082/upload', data, config)
            .then(function(res) {
                console.log(res);
                if (res.status == 200) {
                    addResourceViewModal['resource' + id] = res.data.data.url;
                }

            }, function(err) {
                console.log(err);
            })
    }
};

BootstrapModal.fromTemplateUrl('/scripts/components/modal/addResourceModal.html', { viewModel: addResourceViewModal })
    .then(function(modal) {
        _addResourceModal = modal;
    });
var addResourceModal = {};
addResourceModal.open = function(opts) {
    DomUtil.setStyle(_addResourceModal.dom, 'z-index', '1051');
    var type = opts.type;
    addResourceViewModal.type(type);
    addResourceViewModal.addResource = function() {
        var resource = {
            type: addResourceViewModal.type(),
            url: addResourceViewModal.resourceFile,
            name: addResourceViewModal.resourceName(),
            faceImg: addResourceViewModal.resourceImg,
        };
        if (!addResourceViewModal.resourceFile || !addResourceViewModal.resourceImg) {
            return  Toast.info({
                text: '文件地址不能为空',
                position: 'top-right',
                type: 'warning'
            }).show();
        }
        addResourceViewModal.closeModal();
        opts.callBack && (opts.callBack(resource));
    }
    _addResourceModal.show();
}

export { addResourceModal };
