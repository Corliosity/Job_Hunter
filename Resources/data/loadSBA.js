/**
 * @author Andrew Corliss
 */
function loadSBA()
{
	//var createData = require('data/sbaDatabase');
			var data = [];
			//var url = "http://api.sba.gov/license_permit/all_by_state/co.json"
			var url ="http://api.sba.gov/rec_sites/all_sites/keywords.json";
			var xhr = Ti.Network.createHTTPClient
			({
				onload: function(e)
				{
					Ti.API.debug(this.responseText);
					var json = JSON.parse(this.responseText);
					//Ti.API.info(json);
					//Ti.API.info(response);
					
					for (var i = 0; i < json.length; i++)
					{
							data.push
						({
							sba_title: json[i].title,
							//sba_desc: response[i].resource_group_description,
							sba_bizdesc: json[i].description,
							sba_url: json[i].url,
							//sba_state: response[i].description,
							sba_biz: json[i].category
						});
					}//end for loop
						//Ti.API.info('Calling our database');
						var database = new createData();
						//Ti.API.info('Putting new data in');
						database.add(data);
						
					//jsonArray = Ti.App.fireEvent('data.google',{"responseText":this.responseText});
					createArray = Ti.App.fireEvent()
				}, // end onload function
				
				onerror: function(e)
				{
					Ti.API.info('error, HTTP status = ' + this.status);
					alert(e.error);
				},
				
				timeout: 10000,
				
			}) // end var xhr
			
			xhr.open("GET", url);
			
			xhr.send();
			
} //end loadSBA
module.exports = loadSBA;