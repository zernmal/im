var mysql      = require('mysql');
var Db = function(){
	var _that = this,
		connection = null,
		_connect = function(){
			connection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'me',
			  password : 'secret'
			});
			connection.connect();
		},
		_closeConnect = function(){
			connection.end();
		};		

	_that.query = function(sql,callback){
		connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
			  if (err){
			  	throw err;
			  }	
			  callback(rows,fields);			  
		});
		_closeConnect();
	};
};

module.exports = Db;