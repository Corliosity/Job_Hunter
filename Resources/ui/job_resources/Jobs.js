/**
 * @author Andrew Corliss
 */
function Jobs(){

	var self = Ti.UI.createWindow({
		title:"Job Services",
		barColor: "#4FAB43",
		backgroundColor: '#000'
	});
	/*
	var tips = Ti.UI.createButton({
		title: 'Job Tips',
		height: 100,
		width: 100,
		top: 5,
		left: 5
	});
	
	var resource = Ti.UI.createButton({
		title: 'Job Resources',
		height: 100,
		width: 100,
		top: 5,
		right: 5
	});
	
	var corn = Ti.UI.createButton({
		title: 'Corn On The Job',
		height: 100,
		width: 100,
		top: 150,
		left: 5
	});
	
	var others = Ti.UI.createButton({
		title: 'Job Blogs',
		height: 100,
		width: 100,
		top: 150,
		right: 5
	});
	
	var jobNow = Ti.UI.createButton({
		title: 'Get A Job Now',
		height: 100,
		width: 100,
		top: 250
	});
	*/
	

	var tableData = [
		{title: 'Job Conversations', hasChild: true, test: '/ui/job_resources/JobTips', backgroundImage: 'images/tablerow.png', backgroundColor: 'transparent'},
		{title: 'Start A Business', hasChild: true, test: '/ui/job_resources/JobResource', backgroundImage: 'images/tablerow.png', backgroundColor: 'transparent'},
		{title: 'Job Blogs', hasChild: true, test: '/ui/blogs/JobBlogs', backgroundImage: 'images/tablerow.png', backgroundColor: 'transparent'},
		//{title: 'RezScore', hasChild: true, test: '/ui/jobnow/JobsNow'},
		{title: 'Salary Calculator', hasChild: true, test: '/ui/jobnow/JobsNow', backgroundImage: 'images/tablerow.png', backgroundColor: 'transparent'}
		//{title: 'Job Seeker Check-In', hasChild: true, test: '/ui/check-in/check'}
	];
	
	var tableView = Ti.UI.createTableView({
		data:tableData,
		minRowHeight: 75,
		backgroundColor: 'transparent',
		backgroundImage: 'images/bg2.png',
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
		//backgroundImage: '/images/tablerow.png'
	});
	//Add the table View event listner
	
	self.add(tableView);
	
	tableView.addEventListener('click', function(e){
		if (e.rowData.test) {
			var ExampleWindow = require(e.rowData.test),
				win = new ExampleWindow({
					title:e.rowData.title,
					containingTab:self.containingTab,
					tabGroup:self.tabGroup
				});
			self.containingTab.open(win,{animated:true});
		}
		Ti.API.info('You Clicked ' + e.rowData.title + ' ' + e.rowData.test);
	});

/*
	win.add(tips);
	win.add(resource);
	win.add(corn);
	win.add(others);
	win.add(jobNow);
	*/
	return self;
}

module.exports = Jobs;