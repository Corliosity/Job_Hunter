/**
 * @author Andrew Corliss
 */
function GoogleWebService(){
	//create connection to database
	var location = require('data/geoLocation');
	//new location();
	//var dataBase = require('data/dataBase');
	//Call location informatoin
	
	
	//hardcode lat and lon for temporary testing
	var lat; //= Ti.App.addEventListener('location.update',function(d){lat = d.coords.latitude});
	var lon;

	Ti.App.addEventListener('location.update', function(d){
		Ti.API.debug(d);
		//Ti.API.info(d);
		//Ti.API.info(d.coords);
		lat = d.coords.latitude;
		lon = d.coords.longitude;
		//Ti.API.info(d.coords.latitude);
		//Ti.API.info('lat inside: ' + lat);
	//});

	//Ti.API.info(lat);
	//Create url string to get unemployment offices data
	var api_Key = "AIzaSyDGqJj8VLCUYegrqifd5y7m3-Qr6P0UTkY";
	var request = "https://maps.googleapis.com/maps/api/place/search/json?";
	var request_location = "location=" + lat +"," + lon;
	var request_radius = "&rankby=distance";
	var request_keyword = "&keyword=unemployment+staffing+recruiting";
	var request_sensor = "&sensor=false";
	var request_api = "&key=" + api_Key;
	
	var url = request + request_location + request_radius + request_keyword + request_sensor + request_api;
	//Ti.API.info("You are requesting " + url);
	
	//create call to the webservice
	var xhr = Ti.Network.createHTTPClient({
		
		onload: function(e){
		
			Ti.API.debug(this.responseText);
			
			var json = JSON.parse(this.responseText);
			//var data = [];
			
			//Ti.API.info(json.results);
			//Ti.API.info(json.next_page_token);
			
			//If firing event do not need to do a data.push since will parse information on view load
			/*
			for (var i = 0; i < json.results.length; i++) {
				data.push({
					name: json.results[i].name,
					address: json.results[i].vicinity,
					latitude: json.results[i].geometry.location.lat,
					longitude: json.results[i].geometry.location.lng,
					icon: json.results[i].icon,
					details: json.results[i].reference,
				});
				//Ti.API.info("Your data " + json.results[i].name +" "+ json.results[i].vicinity);
			}//ending the for loop funciton

			Ti.API.info('Calling our database');
			var database = new dataBase();
			Ti.API.info('Putting new data in');
			database.add(data);
			*/
			jsonArray = Ti.App.fireEvent('data.google',{"responseText":this.responseText});

		}, // ending our onload function
		
		onerror: function(e){
			Ti.API.info('error, HTTP status = ' + this.status);
			alert(e.error);
			Ti.API.info(e.error);
		},
		
		timeout: 10000 // in miliseconds
		
	});  // ending variable xhr for network connection
	
	xhr.open("GET", url);

	xhr.send();
	
	//Ti.API.info("Completed request")
	});
};

module.exports = GoogleWebService;

