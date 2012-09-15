/**
 * @author Andrew Corliss
 */
function JobsNow(){
	var self = Ti.UI.createWindow({
		backgroundColor: '#fff',
		barColor: '#4FAB43',
		title: 'Salary Calculator'
	});

	
	var webDOL = Titanium.UI.createWebView
	({
		url: 'webSite/salaryWeb.html'
	});
	
	self.add(webDOL);
	
	return self;
}
module.exports = JobsNow;