import { DomUtil, Util } from '../../core/core.js';
import { BootstrapModal } from '../commonTool/modal.js';
import { user, asynData, getLocalProjectId } from '../../dataservice/CommonDatabase.js';
import ko from 'knockout';
import axios from 'axios';


var addResourceModal = null,
    addResourceViewModal = {
        type: ko.observable(''),
        resourceName: ko.observable(''),
        resourceFile: ko.observable(''),
        resourceImg: ko.observable(''),
        closeModal: function() {
            addResourceModal.hide();
        },
        addResource: function() {
            console.log('user:', getLocalProjectId());

            if (!addResourceViewModal.resourceFileText || !addResourceViewModal.resourceImgText || !addResourceViewModal.resourceName()) {
                return console.log('请完善表格数据');
            }

            var userInfo = user.getUser(),
                projectId = getLocalProjectId(),
                resource = {
                    type: addResourceViewModal.type(),
                    url: addResourceViewModal.resourceFileText,
                    name: projectId,
                    faceImg: addResourceViewModal.resourceImgText,
                },
                config = {
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(percentCompleted);
                    }
                };
            console.log('upload resource:', resource);

            var data = {
            	email: userInfo.email,
            	unionId: userInfo.unionId,
            	projectId: projectId,
            	resources: [resource]
            };
            console.log(data);

            asynData('AddResources', data)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log('添加项目资源失败',err);
                })

        },
        upload: function(id) {
            var data = new FormData(),
                config = {
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(percentCompleted);
                    }
                },
                file = document.getElementById(id).files[0];
            console.log(file);
            if (!file) {
                console.log('请先选择文件！');
                return false;
            }
            data.append('file', file);

            axios.put('http://172.16.102.186:8082/upload', data, config)
                .then(function(res) {
                    console.log(res);
                    if (res.status == 200) {
                        addResourceViewModal['resource' + id + 'Text'] = res.data.data.url;
                    }

                }, function(err) {
                    console.log(err);
                })
        }
    };

BootstrapModal.fromTemplateUrl('/scripts/components/modal/views/addResourceModal.html', { viewModel: addResourceViewModal })
    .then(function(modal) {
        addResourceModal = modal;
        addResourceModal.open = function(type) {
            addResourceViewModal.type(type);
            console.log('addModal type', type);

            addResourceModal.show();
        }
    })

export { addResourceModal };
