//projectModel.js
var mongoose = require('mongoose');
var LNG = require('./CONSTANT.js').LNG;

var projectSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    leader: {
        type: String,
        required: true,
        index:true,
    },
    resources: [{ 
        type: { type: String, required: true }, 
        url: { type: String, required: true } ,
        name: { type: String, required: true } ,
        faceImg: { type: String} ,
        _id:false
    }],
    members: [String],
    projectData:mongoose.Schema.Types.Mixed,
    createDate: {
        type: Date,
        default: Date.now
    }
});

function nameValidator(str) { 
    var reg = /^[a-zA-Z\d]\w{3,11}[a-zA-Z\d]$/;
    return reg.test(str);
}

projectSchema.path('name').validate(nameValidator,LNG.PROJECT_NAME_ERROR);


var projectModel = mongoose.model('project',projectSchema);
module.exports = projectModel;