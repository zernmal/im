getLibFile("db");
var crypto = require("crypto");
var User = function(){
	var _that = this;
	
	_that.getAll = function(callback){
		DBpool.getConnection(function(err, connection) {
			connection.query( 'select * from s_type ', function(err, rows, fields) {
				if (err) throw err;
				connection.release();
				callback(rows,fields);
			});
		});			
	};

	_that.checkLogin = function(email,password,callback){//回调里面传入用户信息

		_that.get({email:email,password:password},callback);
	};

	_that.get = function(options,callback){
		options = options || {};
		var getUserBySql = function(){
			var whereSql = [];
			for(var i in options){
				if(i=="userid"||i=="username"||i=="email"||i=="password"){
					whereSql.push(" "+i+" = '"+options[i]+"' ");
				}
			}
			if(whereSql.length>0){
				whereSql = " where "+ whereSql.join(" and ");
			}else{
				whereSql = "";
			}
			DBpool.getConnection(function(err, connection) {
				connection.query( "select * from i_user "+whereSql+" limit 1 ", function(err, rows, fields) {
					if (err) throw err;
					connection.release();
					if(rows&&rows[0]){
						callback(rows[0],fields);
					}else{
						callback(false,fields);
					}
				});
			});
		};
		getUserBySql();
		/*if(options.userid){

		}else{

		}*/
	};
	
	_that.update = function(){

	};
	_that.create = function(){

	};
	_that.getAdmins = function(callback){

	};
	_that.isAdmin = function(userid,callback){
		DBpool.getConnection(function(err, connection) {
			connection.query( "select * from s_admin where userid = "+userid+" limit 1 ", function(err, rows, fields) {
				if (err) throw err;
				connection.release();
				if(rows&&rows[0]){
					callback(rows[0],fields);
				}else{
					callback(false,fields);
				}
			});
		});
	}

};

module.exports = User;