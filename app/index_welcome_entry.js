// welcome_entry.js
import axios from 'axios';
import DomUtil from './scripts/core/DomUtil.js';
import DomEvent from './scripts/core/DomEvent.js';
import {user} from './scripts/dataservice/CommonDatabase.js';

 var sumitBtn=DomUtil.getById('sumit-btn');
 DomEvent.on(sumitBtn,'click',function(){
 	var form=DomUtil.getById('login-form');
 	var email=form.user.value;
 	var psw=form.psw.value;
 	if(email&&psw)
 	{
 		console.log(email,psw);
 		console.log(user);
 		user.asynLogin(email,psw).then(function(data){
 			console.log(data);
			var location=window.location;
			location.href=location.origin+'/user.html';
		},function(error){
			console.log(error.message);
		});
 	}
 	return false;
 });
