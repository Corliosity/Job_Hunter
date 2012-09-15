/**
 * @author Andrew Corliss
 */
function BlogDetail(idIndex, idtitle, idDetail, idLink, parentWindow)
{
	Titanium.include('ui/job_resources/strip_tags.js');
	
	idDetail = idDetail.replace("&#8217;", "'");
	idDetail = idDetail.replace("&#8217;", "'");
	idDetail = idDetail.replace("&#8217;", "'");
	idDetail = idDetail.replace('&#160;', '');
	idDetail = idDetail.replace('&#160;', '');
	idDetail = idDetail.replace('&#160;', '');
	idDetail = idDetail.replace('&#160;', '');
	idDetail = idDetail.replace('&#160;', '');
	idDetail = idDetail.replace('&#8220;', "'");
	idDetail = idDetail.replace('&#8221;', "'");
	idDetail = idDetail.replace("&#38;", '');
	
	var self = Ti.UI.createWindow
	({
		title: idTitle,
		barColor: '#4FAB43',
		backgroundColor: 'transparent',
		backgroundImage: 'images/bg2.png'
	});
	
	var blog_Title = Ti.UI.createLabel
	({
		text: idtitle,
		height: 'auto',
		width: 'auto',
		top: 2,
		left: 20
	});
	
	var blog_Detail = Ti.UI.createLabel
	({
		text: idDetail,
		height: 'auto',
		width: 'auto',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		top: 60,
		left:10
	});
	
	var blog_Link = Ti.UI.createLabel
	({
		text: idLink,
		height: 'auto',
		width: 'auto',
		top: 290,
		left: 10,
		right: 10,
		color:'blue'
	});
	
	blog_Link.addEventListener('click', function(e)
	{
		Titanium.Platform.openURL(idLink);
	});
	
	self.add(blog_Title);
	self.add(blog_Detail);
	self.add(blog_Link);
	
	return self;
}
module.exports = BlogDetail;