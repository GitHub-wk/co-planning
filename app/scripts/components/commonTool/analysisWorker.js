// analysisWorker.js
// 
function getArea (latLngs) {
    var pointsCount = latLngs.length,
        area = 0.0,
        d2r = 0.017453292519943295,
        p1, p2;
    if (pointsCount > 2) {
        for (var i = 0; i < pointsCount; i++) {
            p1 = latLngs[i];
            p2 = latLngs[(i + 1) % pointsCount];
            area += ((p2[0] - p1[0]) * d2r) *
                (2 + Math.sin(p1[1] * d2r) + Math.sin(p2[1] * d2r));
        }
        area = area * 6378137.0 * 6378137.0 / 2.0;
    }
    return Math.abs(area);
}
onmessage=function(message){
	var project=message.data;
	var greenArea=project.greenArea;
	var projectArea=project.projectArea;
	var buildingJSON=project.buildingJSON;
	var buildingArea=0;
	var buildingPlotArea=0;
	var greenRatio=greenArea/projectArea;
	var plotRatio;
	var buildingDensity;
	//TODO
	//
	for(var i=0;i<buildingJSON.features.length;i++)
	{
		feature=buildingJSON.features[i];
		var area=getArea(feature.geometry.coordinates[0]);
		buildingArea+=area;
		buildingPlotArea+=area*(feature.properties.FLOORNUM||1);
	}
	plotRatio=buildingPlotArea/projectArea;
	buildingDensity=buildingArea/projectArea;
	postMessage({
		greenArea:greenArea,
		projectArea:projectArea,
		greenRatio:greenRatio,
		buildingArea:buildingArea,
		buildingDensity:buildingDensity,
		plotRatio:plotRatio
	})
}