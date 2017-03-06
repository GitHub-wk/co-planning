// CONSTANT.js
// 
const STATUS={
	"ERROR":{lng:'操作错误',code:0},
	"SUCCESS":{lng:'操作成功',code:1},
	"REGISTER_ERROR":{lng:'注册失败',code:10},
	"REGISTER_SUCCESS":{lng:'注册成功',code:11},
	"LOGIN_ERROR":{lng:"登陆错误",code:20},
	"LOGIN_SUCCESS":{lng:"登陆成功",code:21},
	"LOGOUT_SUCCESS":{lng:"注销成功",code:31},
	"AUTH_ERROR":{lng:"验证失败",code:40},
	"UPLOAD_SUCCESS":{lng:"上传成功",code:51},
	"UPLOAD_ERROR":{lng:"上传失败",code:50},
}
const LNG={
	
}

const RESOURCETYPE={
	"BUILDING":1,
	"GREEN":2,
	"MODAL":3,
	"TEXTURE":4,
}
module.exports={
	STATUS:STATUS,
	RESOURCETYPE
}