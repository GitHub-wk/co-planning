//solar angle calculate class
export class SolarAngle{
	constructor(DateTime, latLng){
		this.dateTime = DateTime;
		this.latLng = {
			lat: latLng.lat,
			lng: latLng.lng
		};
	}



	//calculate solar declination
	_getSolarDeclination(){
		var n = getDayNumber(this.dateTime);
		console.log(n)

		var b = 2 * Math.PI *(n - 1)/365,
			solarDeclination = 0.006918-0.399912 * Math.cos(b) + 0.0070257 * Math.sin(b) - 0.006758 * Math.cos(2 * b)
								 + 0.000907 * Math.sin(2 * b) - 0.002697 * Math.cos(3 * b) + 0.00148 * Math.sin(3 * b);
		return solarDeclination;						 
	}

	//calculate solar hour angle
	_getHourAngle(){
		var trueSolarTimeMilli = this.dateTime.getTime() + 4 * 60 * 1000 * (120 - this.latLng.lng),
			trueSolarTimeDate = new Date(trueSolarTimeMilli);

			console.log((trueSolarTimeDate.getHours() - 12) * 15)

		return (trueSolarTimeDate.getHours() - 12) * 15;
	}

	//calculate solar height angle and solar direction angle
	getSolarAngle(){
		var declination = this._getSolarDeclination(),
			hourAngle = this._getHourAngle() / 180 * Math.PI,
			lat = this.latLng.lat / 180 * Math.PI;
			console.log(hourAngle);

		var sina = Math.sin(lat) * Math.sin(declination) + Math.cos(lat) * Math.cos(declination) * Math.cos(hourAngle);
			console.log(sina);
		var solarElevation = Math.asin(sina),
			solarDirection = Math.acos(Math.sin(declination) - (Math.sin(solarElevation) * Math.sin(lat)) / (Math.cos(solarElevation) * Math.cos(lat)));

		// moring and afternoon  can confirm solarDirection,
		// direction start from north, clockwise. range: 0 ~ 360'
		solarDirection = (hourAngle >= 0) ? (2 * Math.PI - solarDirection) : solarDirection;

		return {
			elevation : solarElevation,
			direction : solarDirection
		}
	}
}

//calculate during days from current year's first day to current date
function getDayNumber(date){
	if(date instanceof String){
		var currentDate = new Date(date);
	}else if(date instanceof Date){
		var currentDate = date;
	}

	var year = currentDate.getFullYear(),
		now = currentDate.getTime(),
		initial = (new Date(year + '-1-1')).getTime(),
		offSet = now - initial;

	return Math.floor(offSet / 24 / 3600 / 1000) + 1;
}
