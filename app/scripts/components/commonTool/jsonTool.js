// jsonTool.js
var jsonBoundBox=function(geojson){
	var boundBox={
		xMin:Infinity,
		yMin:Infinity,
		xMax:-Infinity,
		yMaX:-Infinity,
		centerX:0,
		centerY:0,
		xLength:0,
		yLength:0
	};
	for(var i=0;i<geojson.features.length;i++){
		var feature=geojson.features[i];
		var geometry=feature.geometry;
		var properties=feature.properties;
		var coordinates=geometry.coordinates;
		for(var j=0;j<coordinates[0].length;j++)
		{
			var coordinate=coordinates[0][j];
			(boundBox.xMin>coordinate[0])&&(boundBox.xMin=coordinate[0]);
			(boundBox.yMin>coordinate[1])&&(boundBox.yMin=coordinate[1]);
			(boundBox.xMax<coordinate[0])&&(boundBox.xMax=coordinate[0]);
			(boundBox.yMaX<coordinate[1])&&(boundBox.yMaX=coordinate[1]);
		}
	}
	boundBox.centerX=(boundBox.xMax+boundBox.xMin)/2;
	boundBox.centerY=(boundBox.yMaX+boundBox.yMin)/2;
	boundBox.xLength=boundBox.xMax-boundBox.xMin;
	boundBox.yLength=boundBox.yMaX-boundBox.yMin;
	return boundBox;
}

export {
	jsonBoundBox,
}