var userModel = require('../model/userModel');
var userLayer = require('../layers/userLayer.js');
var STATUS = require('./STATUS_CONSTANT.js');
var Q = require('q');

function userRegister(opts) {
    var defer = Q.defer();
    var user = new userModel({
        userName: opts.userName,
        email: opts.email,
        password: opts.password,
        faceImg: opts.faceImg
    });
    user.save(function (error) {
        var back = null;
        if (error) {
            back = { msg: STATUS.REGISTER_ERROR.lng, data: null, code: STATUS.REGISTER_ERROR.code ,status:STATUS.ERROR.code};
            defer.reject(back);
        }
        else {
            console.log('user register:',user.email);
            back = { msg: STATUS.REGISTER_SUCCESS.lng, data: user, code: STATUS.REGISTER_SUCCESS.code ,status:STATUS.SUCCESS.code};
            defer.resolve(back);
        }
    });
    return defer.promise;
}

module.exports = userRegister;