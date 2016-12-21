// MercatorProjection.js
export class MercatorProjection{
	constructor(name){
		this.name=name;
	}
	pointToLngLat(point){
		var x=point.x+33554432;
		var y=33554432-point.y;
		var lat=360*Math.atan(Math.exp((1-y/Math.pow(2,25))*Math.PI))/Math.PI-90;
		var lng=x*360/(Math.pow(2,26))-180;
		return {
			lat:lat,
			lng:lng
		}
	}
	lngLatToPoint(lngLat){
		var lat=lngLat.lat;
		var lng=lngLat.lng;
		var x=(lng+180)*(Math.pow(2,26))/360;
		var y=(1-Math.log(Math.tan((lat+90)*Math.PI/360))/Math.PI)*Math.pow(2,25);
		return {
			x:x-33554432,
			y:33554432-y
		}
	}

}

export class BaiDuMercator extends MercatorProjection{
	constructor(){
		super('BaiDuMercatorProjection');
		this.R=6378137;
	}
	pointToLngLat(point){
		var x=point.x;
		var y=point.y;
		var lat=Math.atan(Math.pow(Math.E,y/this.R))*360/Math.PI-90;
		var lng=x/(Math.PI*this.R)*180;
		return{
			lat:lat,
			lng:lng
		}
	}
}