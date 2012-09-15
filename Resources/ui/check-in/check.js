/**
 * @author Andrew Corliss
 */
function check(){
	var self = Ti.UI.createWindow({
		backgroundColor: '#fff',
		barColor: '#74D3ED',
		title: 'Check-In'
	});
	
	var explain = Ti.UI.createLabel({
		top: 5,
		font: {fontSize: 16},
		text: 'When on the job search it\n can be frustrating to find Work,\n so check-in and reward yourself',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		width: 'auto', height: 'auto'
	});
	
	var send = Titanium.UI.createButton({
    	title : 'Done',
    	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
	
	var cancel = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.CANCEL
	});
	
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var What = Ti.UI.createTextField({
		top: 100,
		width: 300,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText: 'Check-In to Job Seeker Process',
		keyboardToolbar: [cancel, flexSpace, send]
	});
	
	var update = Ti.UI.createButton({
		title: 'Update Score',
		height: 50,
		width: 100,
		top: 150
	})
	
	self.add(explain);
	self.add(What);
	self.add(update);
	return self;
}
module.exports = check;