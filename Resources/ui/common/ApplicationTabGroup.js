function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs

	//var win1 = new Window(L('home')),
		//win2 = new Window(L('settings'));
	//var	win3 = new Window(L('about'));

	var jobListWindow = require('/ui/job_resources/Jobs');
	var win1 = new jobListWindow('Job Resources');
	var tab1 = Ti.UI.createTab({
		title: L('home'),
		icon: '/images/lightbulb@2x.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var twitterList = require('/ui/twitter/TwitterList');
	var win2 = new twitterList('Twitter List');
	var tab2 = Ti.UI.createTab({
		title: L('social'),
		icon: '/images/network@2x.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var employmentTab = require('/ui/employmentLocations/EmploymentOffice');
	var win3 = new employmentTab('Employment Offices');
	
	var tab3 = Ti.UI.createTab({
		title: L('about'),
		icon: '/images/globe@2x.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	return self;
};

module.exports = ApplicationTabGroup;
