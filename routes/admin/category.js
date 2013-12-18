var mysql	= require('mysql'),
	System = require(__dirname+"/../../model/system"),
	systemModel = new System(),
	dbInfo = systemModel.getDbInfo();


module.exports.index = function(req, res){
	var connection = mysql.createConnection({
		  host     : dbInfo.host,
		  user     : dbInfo.user,
		  password : dbInfo.passwd
		});
	connection.connect();
	
	console.log(connection);

	res.render('admin/category/index', { title: '栏目列表' });	
	connection.end();
	
};