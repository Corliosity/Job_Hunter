/**r
 * @author Andrew Corliss
 */
function JobResource()
{
	var database = require('data/sbaDatabase');
	var createData = new database();
	var results = createData.get();
	
		var win = Ti.UI.createWindow
		({
			backgroundColor:'transparent',
			barColor: '#4FAB43',
			title: 'Start A Business'
		});
		
		var tableview = Ti.UI.createTableView({data:results, minRowHeight:52});
		
		function populateData()
		{
			var createResult = createData.get();
			tableview.setData(createResult); 
		}; //end function
		populateData();
		
		
		win.add(tableview);
		
		tableview.addEventListener('click', function(evt)
		{
			Ti.API.info("You selected: " + evt.rowData.title);
			var newDetail = require('/ui/job_resources/bizLicense');
			var details = new newDetail(evt.rowData.title, evt.rowData.biz, evt.rowData.desc, evt.rowData.r_url, win);
			win.tabGroup.activeTab.open(details);
		});
		
		return win;
};
module.exports = JobResource;
