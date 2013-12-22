getLibFile("db");
var Type = function(){
	var _that = this;
	
	_that.getAllType = function(callback){
		var sql = 'select * from s_type ';
		//console.log(sql);
		dbConnection.query( sql , function(err, rows, fields) {
			if (err) throw err;
			callback(err,rows,fields);
		});
	};

	_that.getType = function(){

	};
	_that.updateType = function(){

	};
	_that.createType = function(){

	};

};

module.exports = Type;