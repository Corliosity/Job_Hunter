/**
 * @author Andrew Corliss
 */
function bizLicense(idtitle, idBiz, idDesc, idurl, parentWindow)
{
	var self = Ti.UI.createWindow
	({
		title: idtitle,
		barColor: '#4FAB43',
		backgroundColor: 'transparent',
		backgroundImage: 'images/bg2.png',
		layout: 'vertical'
	});
	
	var liceLabel = Ti.UI.createLabel
	({
		text: idtitle,
		top: 20,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		left: 20,
		color: '#000',
		width: 'auto',
		height: 'auto',
		font: {fontSize: 24},
	});
	self.add(liceLabel);
	
	var bizD = Ti.UI.createLabel
	({
		text: idBiz,
		top: 25,
		left: 20,
		font: {fontSize: 20},
		color: '#000',
		width: 'auto',
		height: 'auto',
	});
	self.add(bizD);

	
	var urlDesc = Ti.UI.createLabel
	({
		text: idDesc,
		top: 25,
		left: 10,
		right: 10,
		font: {fontSize: 20},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: '#000',
		width: 'auto',
		height: 'auto',
	});
	self.add(urlDesc);
	
	var r_url = Ti.UI.createLabel
	({
		text: idurl,
		top: 10,
		font: {fontSize:24},
		color: 'blue',
		width: 275,
		left: 10,
		right: 10,
		height: 'auto',
		color: 'blue'
	});
	r_url.addEventListener('click', function(e)
	{
		Titanium.Platform.openURL(idurl);
	});
	
	self.add(r_url);
	
	return self;
}
module.exports = bizLicense;