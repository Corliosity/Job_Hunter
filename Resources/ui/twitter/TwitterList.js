/**
 * @author Andrew Corliss
 */
function TwitterList(){
	var win = Titanium.UI.createWindow({
		title: 'HR Twitter Users',
		barColor: '#4FAB43',
		backgroundColor: '#000'
	});
		//var data = [{title: 'me', def: 'createtheinno', hasChild:true}];
		
		//var row = Ti.UI.createTableViewRow({hasChild:true, height:52, backgroundColor: 'transparent', backgroundImage: 'images/tableviewrow2.png'});
		var fileName = 'Tweeters.json';
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
		//Note orignial values of HR and Twitter
		var title, def, backC, backI
		var listArray = JSON.parse(file.read(title).text);
		
		var aTableView = Titanium.UI.createTableView({hasDetail:true, data:listArray, backgroundColor: 'black'});
		win.add(aTableView);
		 //Ti.API.info('title =  ' + listArray.HR.title);

	aTableView.addEventListener('click', function(evt)
	{
			var twitterDetail = require('/ui/twitter/twitterDetail');
			var tweeting = new twitterDetail(evt.rowData.title, evt.rowData.def, win);
			Ti.API.info('evt.rowData.def is: ' + evt.rowData.def);
			win.containingTab.open(tweeting);
	});
	
	
	return win;
};
module.exports = TwitterList;
