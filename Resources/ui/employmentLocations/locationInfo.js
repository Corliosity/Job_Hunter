/**
 * @author Andrew Corliss
 */
function locationInfo(idtitle, idlat, idlng, idadd, idmine, parentWindow)
{
	var self = Ti.UI.createWindow
	({
		barColor: '#4FAB43',
		title: idtitle,
		backgroundColor: 'transparent',
		layout: 'vertical',
		backgroundImage: 'images/bg2.png'
	});
	
	var mapview = Titanium.Map.createView
	({
		top: 1,
		height: 150,
		width: 350,
		animate: false,
		region:
		{
		latitude: idlat,
		longitude: idlng,
		latitudeDelta: 0.01,
		longitudeDelta: 0.001
		},
		regionFit: true,
		userLocation: true,
	});
	
	mapview.addAnnotation
			(
				Ti.Map.createAnnotation
				({
					animate: false,
					pincolor: Titanium.Map.ANNOTATION_RED,
					title: idtitle, //+ ', $' + results[i].price,
					latitude: idlat,
					longitude: idlng,
					leftButton: Ti.UI.iPhone.SystemButton.INFO_LIGHT
				})
			);
	
	var nameLabel = Ti.UI.createLabel
	({
		top: 20,
		text: idtitle,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color: '#000',
		width: 'auto',
		font: {fontSize: 18},
		height: 'auto'
	});
	
	var addressLabel = Ti.UI.createLabel
	({
		top: 10,
		color: '#000',
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		text: idadd,
		width: 'auto',
		height: 'auto'

	});
	
	function getPlaceDetails()
	{
		var url_det = "https://maps.googleapis.com/maps/api/place/details/json?";
		var url_ref = "reference=" + idmine;  //returns information on location selected.
    	var sense = "&sensor=false";
    	var key = "&key=AIzaSyDGqJj8VLCUYegrqifd5y7m3-Qr6P0UTkY";
    	var url = url_det + url_ref + sense + key;
    	
    	Ti.API.info(url);
    	
    	var xhr = Ti.Network.createHTTPClient
    	({
    		onload: function(e)
    		{
    			Ti.API.debug(this.responseText);
    			
    			var json = JSON.parse(this.responseText);
    			
    			
    			var phone = Ti.UI.createLabel
    			({
    				text: json.result.formatted_phone_number,
    				top: 10,
    				color: '#000',
    				textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    				width: 'auto',
    				height: 'auto',
    				color: 'blue'
    			}) //create phone label
    			
    			var webSite = Ti.UI.createLabel
    			({
    				text: json.result.website,
    				top:10,
    				html: json.result.website,
    				color: 'blue',
    				textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    				width: 'auto',
    				height: 'auto'
    			});
    			
    			self.add(phone);
    			self.add(webSite);
    			webSite.addEventListener('click', function(e)
    			{
    				Titanium.Platform.openURL(json.result.website);
    			});
    			phone.addEventListener('click', function(e)
    			{
    				Titanium.Platform.openURL('tel:' + json.result.international_phone_number);
    			});
    			
    			Ti.API.info(json.result.formatted_phone_number);
    		},  //end onload function
    		
    		onerror: function(e)
    		{
				Ti.API.info('error, HTTP status = ' + this.status);
				alert(e.error);
			},
			
    	}) //end xhr
    	xhr.open("GET", url);

		xhr.send();
    	
	} //end getPlaceDetails
	getPlaceDetails();
	
	
	self.add(mapview);
	self.add(nameLabel);
	self.add(addressLabel);
	
	return self;
}
module.exports = locationInfo;
