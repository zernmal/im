getLibFile("db");
var Category = function(){
	var _configFileHandle = "no",
		_that = this;
	
	_that.getAllCategory = function(){
		dbConnection.query('select * from s_category', function(err, rows, fields) {
			if (err) throw err;
			console.log(rows[0]);
		});
	};

	_that.getCategory = function(siteInfo){

	};
	_that.updateCategory = function(categoryid,options){

	}

};

module.exports = Category;