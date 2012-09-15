/**
 * @author Andrew Corliss
 */

function JobTips(){
	
	var module = require('de.marcelpociot.twitter');
	
	var win = Titanium.UI.createWindow({
		backgroundColor:'transparent',
		barColor: '#4FAB43',
		title: 'Job Hunt'
	});

	function loadTweets(){
		
		// create table view data object
	//var search_Term = 'jobhuntchat';
	var data = [];

	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;
	xhr.open("GET","http://search.twitter.com/search.json?q=%23jobhuntchat+OR+%23hfchat+OR+%23jobsearch+OR+%23jobhunters&rpp=100&result_type=recent&include_entities=true");

	xhr.onload = function()
	{
		try
		{
			var tweets = JSON.parse(this.responseText);
			var response = tweets.results;

			for (var c=0;c<response.length;c++){

				var tweet = response[c].text;
				var user = response[c].from_user;
				var userId = response[c].from_user_id_str;
				var avatar = response[c].profile_image_url;
				var tweetId = response[c].id_str;
				var tweet_url = response[c].entities.urls;
				//Ti.API.info(response.entities[1]);
				//Ti.API.info(response[1].entities.urls.display_url);
				//Ti.API.info(response[c].entities.urls.expanded_url);
				//Ti.API.info(response[c].entities.urls.url);

				//Add in Table View Details
				var created_at = prettyDate(strtotime(response[c].created_at));
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
				
				var row = Ti.UI.createTableViewRow({height:100, backgroundColor:bgcolor});

				// Create a vertical layout view to hold all the info labels and images for each tweet
				var post_view = Ti.UI.createView({
					height:'auto',
					layout:'vertical',
					left:5,
					top:5,
					bottom:5,
					right:5
				});

				var av = Ti.UI.createImageView({
						image:avatar,
						left:0,
						top:0,
						height:48,
						width:48
					});
				// Add the avatar image to the view
				post_view.add(av);

				var user_label = Ti.UI.createLabel({
					text:user,
					left:54,
					width:120,
					top:-48,
					bottom:2,
					height:16,
					textAlign:'left',
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the view
				post_view.add(user_label);
				//Add in the Created on Date Label
				var date_label = Ti.UI.createLabel({
					text:created_at,
					right:0,
					top:-18,
					bottom:2,
					height:14,
					textAlign:'right',
					width:110,
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:12}
				});
				// Add the date to the view
				post_view.add(date_label);
				
				var tweet_text = Ti.UI.createLabel({
					text:tweet,
					left:54,
					top:0,
					bottom:2,
					height:'auto',
					width:236,
					textAlign:'left',
					font:{fontSize:14}
				});
				// Add the tweet to the view
				post_view.add(tweet_text);
				// Add the vertical layout view to the row
				row.add(post_view);
				row.className = 'item'+c;
				//define each element in row
				row.thisTweet = tweet;
				row.thisUser = user;
				row.thisURL = tweet_url;
				row.thisStr = tweetId;
				
				data[c] = row;
			}
			// Create the tableView and add it to the window.
			var tableview = Titanium.UI.createTableView({data:data, minRowHeight:58});
			//Activate an EventListner for tableview
			tableview.addEventListener('click', function(e){
				Ti.API.info('You Selected: ' + e.row.thisURL + ' ' + e.rowData.thisUser);
				Titanium.Platform.openURL('http://twitter.com/'+e.rowData.thisUser+'/status/'+e.rowData.thisStr);
			})
			//Ti.UI.currentWindow.add(tableview);
			win.add(tableview);
			}
			catch(E){
				alert(E);
			}
		};
		// Get the data
			xhr.send();
		}
		function strtotime (str, now) {
	// Emlulates the PHP strtotime function in JavaScript
	// obtained from http://phpjs.org/functions/strtotime:554
	var i, match, s, strTmp = '', parse = '';
	strTmp = str;
	strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
	strTmp = strTmp.replace(/[\t\r\n]/g, ''); // unecessary chars
	if (strTmp == 'now') {
		return (new Date()).getTime()/1000; // Return seconds, not milli-seconds
	} else if (!isNaN(parse = Date.parse(strTmp))) {
		return (parse/1000);
	} else if (now) {
		now = new Date(now*1000); // Accept PHP-style seconds
	} else {
		now = new Date();
	}
	strTmp = strTmp.toLowerCase();
	var __is =
	{
		day:
		{
			'sun': 0,
			'mon': 1,
			'tue': 2,
			'wed': 3,
			'thu': 4,
			'fri': 5,
			'sat': 6
		},
		mon:
		{
			'jan': 0,
			'feb': 1,
			'mar': 2,
			'apr': 3,
			'may': 4,
			'jun': 5,
			'jul': 6,
			'aug': 7,
			'sep': 8,
			'oct': 9,
			'nov': 10,
			'dec': 11
		}
	};
	var process = function (m) {
		var ago = (m[2] && m[2] == 'ago');
		var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);

		switch (m[0]) {
			case 'last':
			case 'next':
				switch (m[1].substring(0, 3)) {
					case 'yea':
						now.setFullYear(now.getFullYear() + num);
						break;
					case 'mon':
						now.setMonth(now.getMonth() + num);
						break;
					case 'wee':
						now.setDate(now.getDate() + (num * 7));
						break;
					case 'day':
						now.setDate(now.getDate() + num);
						break;
					case 'hou':
						now.setHours(now.getHours() + num);
						break;
					case 'min':
						now.setMinutes(now.getMinutes() + num);
						break;
					case 'sec':
						now.setSeconds(now.getSeconds() + num);
						break;
					default:
						var day;
						if (typeof (day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
							var diff = day - now.getDay();
							if (diff == 0) {
								diff = 7 * num;
							} else if (diff > 0) {
								if (m[0] == 'last') {diff -= 7;}
							} else {
								if (m[0] == 'next') {diff += 7;}
							}
							now.setDate(now.getDate() + diff);
						}
				}
				break;
			default:
				if (/\d+/.test(m[0])) {
					num *= parseInt(m[0], 10);
					switch (m[1].substring(0, 3)) {
						case 'yea':
							now.setFullYear(now.getFullYear() + num);
							break;
						case 'mon':
							now.setMonth(now.getMonth() + num);
							break;
						case 'wee':
							now.setDate(now.getDate() + (num * 7));
							break;
						case 'day':
							now.setDate(now.getDate() + num);
							break;
						case 'hou':
							now.setHours(now.getHours() + num);
							break;
						case 'min':
							now.setMinutes(now.getMinutes() + num);
							break;
						case 'sec':
							now.setSeconds(now.getSeconds() + num);
							break;
					}
				} else {
					return false;
				}
				break;
		}
		return true;
	};
	match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
	if (match != null) {
		if (!match[2]) {
			match[2] = '00:00:00';
		} else if (!match[3]) {
			match[2] += ':00';
		}
		s = match[1].split(/-/g);
		for (i in __is.mon) {
			if (__is.mon[i] == s[1] - 1) {
				s[1] = i;
			}
		}
		s[0] = parseInt(s[0], 10);
		s[0] = (s[0] >= 0 && s[0] <= 69) ? '20'+(s[0] < 10 ? '0'+s[0] : s[0]+'') : (s[0] >= 70 && s[0] <= 99) ? '19'+s[0] : s[0]+'';
		return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2])+(match[4] ? match[4]/1000 : ''), 10);
	}

	var regex = '([+-]?\\d+\\s'+
		'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+
		'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday'+
		'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)'+
		'|(last|next)\\s'+
		'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+
		'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday'+
		'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))'+
		'(\\sago)?';
	match = strTmp.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
	if (match == null) {
		return false;
	}
	for (i = 0; i < match.length; i++) {
		if (!process(match[i].split(' '))) {
			return false;
		}
	}
	return (now.getTime()/1000);
}

// creates a 'pretty date' from a unix time stamp
function prettyDate(time){
	var monthname = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var date = new Date(time*1000),
	diff = (((new Date()).getTime() - date.getTime()) / 1000),
	day_diff = Math.floor(diff / 86400);
	if ( isNaN(day_diff) || day_diff < 0 ){
		return '';
	}
	if(day_diff >= 31){
		var date_year = date.getFullYear();
		var month_name = monthname[date.getMonth()];
		var date_month = date.getMonth() + 1;
		if(date_month < 10){
			date_month = "0"+date_month;
		}
		var date_monthday = date.getDate();
		if(date_monthday < 10){
			date_monthday = "0"+date_monthday;
		}
		return date_monthday + " " + month_name + " " + date_year;
	}
	return day_diff == 0 && (
		diff < 60 && "just now" ||
		diff < 120 && "1 minute ago" ||
		diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
		diff < 7200 && "1 hour ago" ||
		diff < 86400 && "about " + Math.floor( diff / 3600 ) + " hours ago") ||
	day_diff == 1 && "Yesterday" ||
	day_diff < 7 && day_diff + " days ago" ||
	day_diff < 31 && Math.ceil( day_diff / 7 ) + " week" + ((Math.ceil( day_diff / 7 )) == 1 ? "" : "s") + " ago";
}		
	loadTweets();
	
	var r = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
	});
	
	
	r.addEventListener('click',function()
	{
		module.tweet
			({
				message: '#jobhuntchat',
				//urls: 		['http://www.marcelpociot.de'],
				//images:		['http://www.marcelpociot.de/logo.png'],
				succes:		function(){
					alert("Tweet successfully sent");
				},
				cancel:		function(){
					alert("User canceled tweet");
				},
				error:		function(){
					alert("Unable to send tweet");
				}
			});
			loadTweets();	
	});

	
	win.setRightNavButton(r);
	
	return win;
	
}	
module.exports = JobTips;
