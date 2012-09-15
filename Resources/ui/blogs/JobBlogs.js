/**
 * @author Andrew Corliss
 */
function JobBlogs(){
	var self = Ti.UI.createWindow({
		backgroundColor: '#fff',
		barColor: '#4FAB43',
		title: 'Top Job Blogs'
	});
	
	//var data = [{title: 'Corn On the Job', hasChild: true, blogURL: 'http://feeds.feedburner.com/campus-to-career/Pqgh'}];

		var fileName = 'Bloggers.json';
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
		var title, blogUrl, backC, backI
		var listArray = JSON.parse(file.read(title));
		//Ti.API.info(listArray);
		//var row = Ti.UI.createTableViewRow({hasChild:true, backgroundColor: 'transparent', backgroundImage: 'images/tableviewrow2.png', height: 52});
			

		var aTableView = Titanium.UI.createTableView({hasDetail:true, data:listArray, backgroundColor:'black'});
		self.add(aTableView);
		 //Ti.API.info('title =  ' + listArray.HR.title);
	
	aTableView.addEventListener('click', function(evt)
	{
		var jobBlog = require('/ui/blogs/BlogList');
		var blogging = new jobBlog(evt.rowData.title, evt.rowData.blogUrl,self);
			Ti.API.info('you clicked: ' + evt.rowData.title + ' ' + evt.rowData.blogURL);
			self.tabGroup.activeTab.open(blogging);
	});
	
	return self;
	
}
module.exports = JobBlogs;