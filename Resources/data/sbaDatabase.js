/**
 * @author Andrew Corliss
 */
function sbaDatabase()
{
	//Create new Database
	this.db = Ti.Database.open('SBA');
	//this.db.execute("DROP TABLE license");
	//Create columns of data
	this.db.execute('CREATE TABLE IF NOT EXISTS license(id INTEGER PRIMARY KEY, name TEXT, description TEXT, url TEXT, biz TEXT);');
	//close db conncetion
	
	this.db.close();
	//Ti.API.info('creating database')	
}
sbaDatabase.prototype.add = function(data)
{
	Ti.API.info('add is being called');
	//open our database
	this.db = Ti.Database.open('SBA');
	//create our data stream
	for (var i = 0; i < data.length; i++)
	{
		this.db.execute('INSERT INTO license(name, description, url, biz) VALUES(?,?,?,?)', data[i].sba_title, data[i].sba_bizdesc, data[i].sba_url, data[i].sba_biz);
		//Ti.API.info(data[i].sba_bizdesc + ' ' + data[i].sba_url);
	}
	//Ti.API.info('for loop finishes');

	//close our database
	this.db.close();
	
}

sbaDatabase.prototype.get = function()
{
	this.db = Ti.Database.open('SBA');
	var results = [];
	var result = this.db.execute('SELECT * FROM license');
	
	while (result.isValidRow())
	{
		results.push({
			//add attributes to be called
			title: result.fieldByName('name'),
			desc: result.fieldByName('description'),
			r_url: result.fieldByName('url'),
			//r_state: result.fieldByName('state'),
			biz: result.fieldByName('biz'),
			
			backgroundColor: 'transparent',
			backgroundImage: 'images/tablerow2.png',
			height: 52,
			hasChild: true
			
		});
		//Ti.API.info("Your push results " + result.fieldByName('name') + result.fieldByName('address'));
		//Capture all of the data fitting the description
		result.next();
	}
	//close the while loop after all data is loaded
	result.close();
	//close the connection to the database
	this.db.close();
	
	//Ti.API.info('while loop closes');
	//create global variable for the results
	return results;
}
module.exports = sbaDatabase;
