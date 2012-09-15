/**
 * @author Andrew Corliss
 */	
function BlogList(idTitle, idDetail, parentWindow){
	var self = Ti.UI.createWindow({
		backgroundColor: 'transparent',
		barColor: '#4FAB43',
		title: idTitle
	});
	
	//Create data flow with url call and include strip tags to clean text
	var url = idDetail;
	Titanium.include('ui/job_resources/strip_tags.js');
		
	var data;
	var i = 0;
	var feedTableView;
	var feedTitle = '';
	function displayItems(itemList){
	
		for (var c=0;c < itemList.length;c++){	
	
			// Ti.API.info('item title :' + itemList.item(c).getElementsByTagName("title").item(0).text);
			// Ti.API.info('item description :' + itemList.item(c).getElementsByTagName("description").item(0).text);
			// Ti.API.info('item enclosure url :' + itemList.item(c).getElementsByTagName("enclosure").item(0).getAttribute("url"));
			
			var title = null;
			var desc = null;
			var link = null;
			//var mp3_url = null;
			
			// If we want to only add items with mp3 enclosures
			if(itemList.item(c).getElementsByTagName("enclosure")!=null){
	
				// Item title
				title = itemList.item(c).getElementsByTagName("title").item(0).text;
				// Item description
				desc = itemList.item(c).getElementsByTagName("description").item(0).text;
				link = itemList.item(c).getElementsByTagName("link").item(0).text;
				// Clean up any nasty linebreaks in the title and description			
				title = title.replace(/\n/gi, " ");			
				desc = desc.replace(/\n/gi, " ");
				desc = desc.replace('&#8217;', "'");
				// Podcast mp3 enclosure
				//mp3_url = itemList.item(c).getElementsByTagName("enclosure").item(0).getAttribute("url");
	
				// Create a table row for this item
				var row = Ti.UI.createTableViewRow({height:75,backgroundColor:'transparent',backgroundImage:'images/tablerow2.png'}); 
		
				// Create a label for the title
				var post_title = Ti.UI.createLabel({
					text: title,
					color: '#000',
					textAlign:'left',
					left:10,
					height:'auto',
					width:'auto',
					top:3,
					font:{fontWeight:'bold',fontSize:16}
				});
				
				row.add(post_title);
				
				// add the Corn on the Job logo on the left
				// naturally this could be an image in the feed itself if it existed
				/*
				var item_image = Ti.UI.createImageView({
					image:'cornhead.png',
					left:1,
					width: 58,
					height: 48
				});
				
				row.add(item_image);
				*/
				// Add some rowData for when it is clicked			
				row.thisTitle = title;
				//row.thisMp3 = mp3_url;
				row.thisDesc = desc;
				row.thisLink = link;
				// Add the row to the data
				data[c] = row;
				// I use 'i' here instead of 'c', as I'm only adding rows which have mp3 enclosures
				c++;
				
			} // end if enclosure		
		}
		
		// create the table
		var feedTableView = Titanium.UI.createTableView({
			data:data,
			backgroundColor: 'black'
		});
		
		// Add the tableView to the current window
		self.add(feedTableView);
		
		// Create tableView row event listener
		feedTableView.addEventListener('click', function(e){
	
			// a feed item was clicked
			Ti.API.info('item index clicked :'+e.index);
			Ti.API.info('title  :'+e.rowData.thisTitle);
			Ti.API.info('description  :'+e.rowData.thisDesc);
			Ti.API.info('url enclosure  :'+e.rowData.thisLink);
			// show an alert
			// Ti.UI.createAlertDialog({title:e.rowData.thisTitle, message:e.rowData.thisMp3}).show();
			
			//item_title_label.text = strip_tags(e.rowData.thisTitle);
			//item_desc_label.text = strip_tags(e.rowData.thisDesc);
			// etc ...	
			// now do some cool stuff! :)
			// like add an audio player, open a new window, etc..
			//Open a New Window
			
				var newBlog = require('/ui/blogs/BlogDetail');
				var blogging = new newBlog(e.index, e.rowData.thisTitle, strip_tags(e.rowData.thisDesc), e.rowData.thisLink, self);
				self.tabGroup.activeTab.open(blogging);
			/*
			stream.stop();
			stream.url = e.rowData.thisMp3;
			stream.start();
			*/
		});
	}
	
	function loadRSSFeed(url){
	
		data = [];
		Ti.API.info('>>>> loading RSS feed '+url);
		xhr = Titanium.Network.createHTTPClient();
		xhr.open('GET',url);
		xhr.onload = function()
		{
				
			Ti.API.info('>>> got the feed! ... ');
			
			// Now parse the feed XML 
			var xml = this.responseXML;
			
			// Find the channel element 
			var channel = xml.documentElement.getElementsByTagName("channel");
	
			feedTitle = channel.item(0).getElementsByTagName("title").item(0).text;
			
			Ti.API.info("FEED TITLE " + feedTitle);
			
			self.title = feedTitle;
			// Find the RSS feed 'items'
			var itemList = xml.documentElement.getElementsByTagName("item");
			Ti.API.info('found '+itemList.length+' items in the RSS feed');
	
			//item_title_label.text = 'DONE';
			//item_desc_label.text = 'click a feed item';
			
			// Now add the items to a tableView
			displayItems(itemList);
	
		};
		
		//item_title_label.text = 'LOADING RSS FEED..';
		//item_desc_label.text = '';
		xhr.send();	
	}
	
	
	// RIGHT NAVBAR REFRESH BUTTON		
	var r = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
	});
	r.addEventListener('click',function()
	{
		// reload feed
		loadRSSFeed(url);	
	});
	self.setRightNavButton(r);
	
	self.addEventListener('open', function() {
		// load the feed
		loadRSSFeed(url);
	});
	/*
	self.addEventListener('blur', function() {
		stream.stop();
	});
	*/
	
	
	return self;
}
module.exports = BlogList;