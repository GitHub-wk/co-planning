
var userLayer = require('../layers/userLayer.js');
var STATUS = require('./STATUS_CONSTANT.js');
var Q = require('q');

function userLogout(opts) {
    var email = opts.email;
    var unionId = opts.unionId;
    var back = null;
    userLayer.logout(email, unionId);
    back = {msg:STATUS.LOGOUT_SUCCESS.lng, data: null, code: STATUS.LOGOUT_SUCCESS.code };
    return Q.when(back);
}

module.exports = userLogout;