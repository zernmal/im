
/*
if(typeof dbConnection === "undefined"){

	var	System = getModelFile("system"),
		systemModel = new System(),
		dbInfo = systemModel.getDbInfo(),
		mysql = require('mysql'),
		connection = mysql.createConnection({
			  host     : dbInfo.host,
			  user     : dbInfo.user,
			  password : dbInfo.passwd || "",
			  database : 'im'
		});

	connection.connect();

	global.dbConnection = connection ;

}
*/

if(typeof DBpool === "undefined"){
	var	System = getModelFile("system"),
		systemModel = new System(),
		dbInfo = systemModel.getDbInfo(),
		mysql = require('mysql')
		DBpool  = mysql.createPool({
			  host: dbInfo.host,
			  user: dbInfo.user,
			  password : dbInfo.passwd || "",
			  database : "im"
		});
}





