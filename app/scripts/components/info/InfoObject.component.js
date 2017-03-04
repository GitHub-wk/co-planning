// InfoObject.component.js
import {DomUtil,Util} from '../../core/core.js';
import * as THREE  from 'threejs';
import {confirmModal} from '../commonTool/modalTool.js';
import {EventEmitter} from '../../core/core.js';
import {SetPositionCommand,SetScaleCommand,SetValueCommand,SetRotationCommand,RemoveObjectCommand} from '../commands/commands.js';

var UI=DomUtil.UI;
var lang={
	'NAME':'名字',
	'POSITION':'位置',
	'ROTATION':'旋转',
	'SCALE':'比例',
	'VISIBLE':'可见',
	'DEL':'删除',
	'CONFIRM_DEL_OBJ':'确认删除此物体?',
}
export default class InfoObject{
	constructor(){
		this.element=DomUtil.createElement('div','info-object');
		this.children=[];
		this.commonEle=this._initDom();
		//for objectChild communicate
		this.signal=new EventEmitter();
		var scope=this;
		this.signal.on('updateUI',function(){
			scope.updateUI(scope.selectedObject);
		});
		this.signal.on('refresh',function(intersects){
			scope.refresh(intersects);
		});
	}
	addChild(child){
		child.containerEle=this.element;
		child.fatherComponent=this;
		this.children.push(child);
		return this;
	}
	removeChild(child){
		child.containerEle=null;
		child.fatherComponent=null;
		Util.removeByValue(this.children,child);
		return this;
	}
	_initDom(){
		var commonInfo=new UI.Panel().setClass('info-commonObject');
		//name
		var objectTypeRow = new UI.Row();
		var objectType = new UI.Text();
		objectTypeRow.add( new UI.Text(lang.NAME).setWidth( '90px' ) );
		objectTypeRow.add( objectType );
		var objectDelete=new UI.Button(lang.DEL).setClass('btn btn-danger btn-sm').setPosition('absolute').setRight('10px').onClick(deleteObject);
		objectTypeRow.add(objectDelete);
		commonInfo.add(objectTypeRow);


		// position
		var objectPositionRow = new UI.Row();
		var objectPositionX = new UI.Number().setWidth( '50px' ).onChange( update );
		var objectPositionY = new UI.Number().setWidth( '50px' ).onChange( update );
		var objectPositionZ = new UI.Number().setWidth( '50px' ).onChange( update );
		objectPositionRow.add( new UI.Text(lang.POSITION).setWidth( '90px' ) );
		objectPositionRow.add( objectPositionX, objectPositionY,objectPositionZ);

		commonInfo.add(objectPositionRow);

		//rotation
		var objectRotationRow = new UI.Row();
		var objectRotationX = new UI.Number().setStep( 10 ).setUnit( '°' ).setWidth( '50px' ).onChange( update );
		var objectRotationY = new UI.Number().setStep( 10 ).setUnit( '°' ).setWidth( '50px' ).onChange( update );
		var objectRotationZ = new UI.Number().setStep( 10 ).setUnit( '°' ).setWidth( '50px' ).onChange( update );

		objectRotationRow.add( new UI.Text(lang.ROTATION).setWidth( '90px' ) );
		objectRotationRow.add( objectRotationX, objectRotationY, objectRotationZ );

		commonInfo.add(objectRotationRow);
		// scale

		var objectScaleRow = new UI.Row();
		var objectScale = new UI.Number( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( update);

		objectScaleRow.add( new UI.Text(lang.SCALE).setWidth( '90px' ) );
		objectScaleRow.add( objectScale);
		commonInfo.add(objectScaleRow);

		var objectVisibleRow = new UI.Row();
		var objectVisible = new UI.Checkbox().onChange( update );

		objectVisibleRow.add( new UI.Text(lang.VISIBLE).setWidth( '90px' ) );
		objectVisibleRow.add( objectVisible );

		commonInfo.add(objectVisibleRow);

		var scope=this;
		function update(){
			var object=scope.selectedObject;
			//console.log(object)
			if(object!=null){
				var newPosition = new THREE.Vector3( objectPositionX.getValue(), objectPositionY.getValue(), objectPositionZ.getValue() );
				if ( object.position.distanceTo( newPosition ) >= 0.01 ) {
					scope.signal.emit('update',new SetPositionCommand(object,newPosition));
				}
				var newRotation = new THREE.Euler( objectRotationX.getValue() * THREE.Math.DEG2RAD, objectRotationY.getValue() * THREE.Math.DEG2RAD, objectRotationZ.getValue() * THREE.Math.DEG2RAD );
				if ( object.rotation.toVector3().distanceTo( newRotation.toVector3() ) >= 0.01 ) {
					scope.signal.emit('update',new SetRotationCommand(object,newRotation));
				}
				var newScale = new THREE.Vector3( objectScale.getValue(), objectScale.getValue(), objectScale.getValue() );
				if ( object.scale.distanceTo( newScale ) >= 0.01 ) {
					scope.signal.emit('update',new SetScaleCommand(object,newScale));
				}
				if ( object.visible !== objectVisible.getValue() ) {
					scope.signal.emit('update',new SetValueCommand(object,'visible',objectVisible.getValue()));
				}

			}
		}
		this.updateUI=function(object){
			if(object){
				Util.log('updateUI in InfoObject.component.js');
				objectType.setValue( object.userData.name||object.name||object.type );

				objectPositionX.setValue( object.position.x );
				objectPositionY.setValue( object.position.y );
				objectPositionZ.setValue( object.position.z );

				objectRotationX.setValue( object.rotation.x * THREE.Math.RAD2DEG );
				objectRotationY.setValue( object.rotation.y * THREE.Math.RAD2DEG );
				objectRotationZ.setValue( object.rotation.z * THREE.Math.RAD2DEG );

				objectScale.setValue( object.scale.x );

				objectVisible.setValue( object.visible );

			}
		}
		function deleteObject(){
			confirmModal.open({
				content:lang.CONFIRM_DEL_OBJ,
				callback:function(flag){
					if(scope.selectedObject&&flag)
					{
						scope.signal.emit('remove',new RemoveObjectCommand(scope.selectedObject,scope.signal));
					}
				}
			});
		}

		return commonInfo.dom;
	}
	refresh(intersects){
		var intersect=intersects[0];
		//if intersect===undefinded
		if(!intersect)
		{
			DomUtil.empty(this.element);
			this.selectedObject=null;
		}
		if(intersect&&intersect.object!==this.selectedObject){
			this.selectedObject=intersect.object;
		    this.updateUI(this.selectedObject);
		 	DomUtil.appendChild(this.element,this.commonEle);
		}
		Util.forEach(this.children,function(child){
			child.execute(intersects);
		});
	}
}