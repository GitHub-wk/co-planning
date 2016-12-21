// message.js
// show messge on the Dom;
var message={};
message.MESSAGE={
	'SUCCESS':'success',
	'INFO':'info',
	'ERROR':'error',
}
message.POSITION={

}
message.show=function(msg,type,position){
	switch (type)
	{
		case MESSAGE.ERROR:
			message.error(msg,position);
			break;
		case MESSAGE.SUCCESS:
			message.success(msg,position);
			break;
		case MESSAGE.INFO:
			message.info(msg,position);
			break;
		default:
			console.log('unknown type');
	}

}
message.error=function(msg,position){
	window.alert(msg);
}
message.info=function(msg,position){
	console.log('un write');
}
message.success=function(msg,position) {
	console.log('un write');
}
export default message;