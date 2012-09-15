/**
 * @author Andrew Corliss
 */
function SalaryCheck(){
	var self = Ti.UI.createWindow({
		backgroundColor: '#fff',
		barColor: '#4FAB43',
		title: 'Check your Salary'
	});
	
	var jobTitle = Ti.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText: 'Input Job Title or Function',
		//keyboardToolbar: [cancel, flexspace, send],
		top: 5,
		width: 300, height: 50
	});
	var jobState = Ti.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText: 'Where do you want a Job',
		//keyboardToolbar: [cancel, flexspace, send],
		top: 75,
		width: 300, height: 50
	});
	var jobCity = Ti.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText: 'What city will you be in',
		//keyboardToolbar: [cancel, flexspace, send],
		top: 135,
		width: 300, height: 50
	});
	
	self.add(jobTitle);
	self.add(jobState);
	self.add(jobCity);
	
	var jobSalary = Ti.UI.createLabel({
		shadowColor: '#000',
		shadowOffset: {x:25,y:25},
		color: 'red',
		text: 'Job Salary Displayed Here',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top:200,
		width: 'auto', height: 'auto'
	});
	self.add(jobSalary);
	
	return self;
};
module.exports = SalaryCheck;
