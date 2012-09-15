/**
 * @author Andrew Corliss
 */
function EmploymentOffice(){
	var webServiceCall = require('data/GoogleWebService');
	new webServiceCall();
	
	var location = require('data/geoLocation');
	new location();
	
	var self = Ti.UI.createWindow
	({
		barColor:'#4FAB43',
		title: 'Staffing'
	});
	
	var lat;
	var lon;
		
	Ti.App.addEventListener('location.update',function(d)
	{
		Ti.API.debug(d);
		lat = d.coords.latitude;
		lon = d.coords.longitude;
		//Ti.API.info('My Map Coord: ' lat + ' ' + lon);
		Ti.API.info("Coord Inside: " + lat + ' ' + lon);
		
	
	//Ti.API.info("Coord Outside: " + lat + ' ' + lon);
	
	var mapview;
	
	mapview = Titanium.Map.createView
	({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude:lat, longitude:lon, 
                latitudeDelta:0.01, longitudeDelta:0.01},
		    animate: false,
		    regionFit: true,
		    userLocation: true		    //height: 300
	});
	
	
		//Call and open our database request
	
	function populateData()
	{
		//Add our event listner for the data stream!
		Ti.App.addEventListener('data.google', function(d)
		{
			Ti.API.debug(d);
			//Ti.API.info('your data: ' + d.responseText);
			//Ti.API.info('your data: ' + d.json.response);
			
		jsonArray = JSON.parse(d.responseText);
		//Ti.API.info(jsonArray.results);
				
		//Ti.API.info('My result: ' + results);
		
		for (var i = 0; i < jsonArray.results.length; i++)
		{
			mapview.addAnnotation
			(
				Ti.Map.createAnnotation
				({
					animate: true,
					pincolor: Titanium.Map.ANNOTATION_GREEN,
					//image: createImage,
					title: jsonArray.results[i].name, //+ ', $' + results[i].price,
					subtitle: jsonArray.results[i].vicinity,
					latitude: jsonArray.results[i].geometry.location.lat,
					longitude: jsonArray.results[i].geometry.location.lng,
					//leftButton: jsonArray.results[i].icon,//Ti.UI.iPhone.SystemButton.INFO_LIGHT,
					myid: jsonArray.results[i].reference,
					rightButton: Ti.UI.iPhone.SystemButton.DISCLOSURE
				})
			);
			
			//Ti.API.info('map view results ' + results[i].name + results[i].address);
			} //end the for loop
			
		});
	} //end function
	populateData();
	
	//Ti.App.addEventListener("UpdatedTable", populateData); // call the function
	
	mapview.addEventListener('click', function(evt)
	{
		/*
			if (evt.clicksource == 'leftButton') {
				//check to see if we get data
				Ti.API.info("Annotation " + evt.title + ", " + evt.annotation.subtitle);
				//create call for detail view
				var LocationDetails = require('/ui/employmentLocations/locationInfo');
				var employmentDetails = new LocationDetails(evt.title, evt.annotation.latitude, evt.annotation.longitude, evt.annotation.subtitle, evt.annotation.myid, self);
				self.containingTab.open(employmentDetails);
			}
		*/	
			if (evt.clicksource == 'rightButton')
			{
				Ti.API.info("Annotation " + evt.title + ", " + evt.annotation.subtitle);
				//create call for detail view
				var LocationDetails = require('/ui/employmentLocations/locationInfo');
				var employmentDetails = new LocationDetails(evt.title, evt.annotation.latitude, evt.annotation.longitude, evt.annotation.subtitle, evt.annotation.myid, self);
				self.containingTab.open(employmentDetails);
			}
	});
	/*
	var getMore = Ti.UI.createButton
	({
		top: 300,
		height: 50,
		width: 350,
		title: "Get More!"
	});
	
	getMore.addEventListener('click', function(evt)
	{
		var googleWeb = require('data/GoogleWebService');
		var newCall = new googleWeb();
		newCall.need();
	});
	*/
	self.add(mapview);
	//populateData();
	//self.add(getMore);
	});  //end eventlistener for geolocation
	
	return self;
	
	
}
module.exports = EmploymentOffice;