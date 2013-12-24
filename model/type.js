getLibFile("db");
var Type = function(){
	var _that = this;
	
	_that.getAll = function(callback){
		dbConnection.query( 'select * from s_type ', function(err, rows, fields) {
			if (err) throw err;
			callback(rows,fields);
		});
	};

	_that.get = function(){

	};
	_that.update = function(){

	};
	_that.create = function(){

	};

};

module.exports = Type;