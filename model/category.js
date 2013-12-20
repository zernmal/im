getLibFile("db");
var Category = function(){
	var _configFileHandle = "no",
		_that = this;
	
	_that.getAllCategory = function(){
		var sql = 'select * from s_category as c ' +
					'left join s_category_info as ci on c.categoryid = ci.categoryid '+
					'left join s_category_setting as cs on c.categoryid = cs.categoryid ';
		//console.log(sql);
		dbConnection.query( sql , function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);
		});
	};

	_that.getCategory = function(siteInfo){

	};
	_that.updateCategory = function(categoryid,options){

	}

};

module.exports = Category;