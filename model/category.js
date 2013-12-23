getLibFile("db");
var Category = function(){
	var _that = this,
		initCategoryInfo = function(c){
			var category = {
					//对应s_category表
					category : {
						categoryid : c.categoryid || null,
						name : c.name || "",
						typeid : c.typeid || 1,
						pic : c.pic || "",
						keyword : c.keyword || "",
						description : c.description || "",
						pid : c.pid || 0,
						staticpath : c.staticpath || "",
						gourl : c.gourl || ""
					},
					//对应s_category_info表
					category_info : {
						categoryid : c.categoryid || null,
						content : c.content || ""

					},
					//对应s_category_setting表
					s_category_setting : {
						categoryid : c.categoryid || null,
						isindex : c.isindex || 3,
						mshow : c.mshow || 1,
						infonum : c.infonum || 25,
						t_index : c.t_index || "",
						t_list : c.t_list || "",
						t_listb : c.t_listb || "",
						t_listimg : c.t_listimg || "",
						t_content : c.t_content || "",
						t_all : c.t_all || 0 

					}
				};
			return category;
		};
	
	_that.getAll = function(callback){
		var sql = 'select * from s_category as c ' +
					'left join s_category_info as ci on c.categoryid = ci.categoryid '+
					'left join s_category_setting as cs on c.categoryid = cs.categoryid ';
		//console.log(sql);
		dbConnection.query( sql , function(err, rows, fields) {
			if (err) throw err;
			callback && callback(rows,fields);
			//console.log(rows);
		});
	};

	_that.get = function(categoryid,callback){
		var sql = 'select * from s_category as c ' +
					'left join s_category_info as ci on c.categoryid = ci.categoryid '+
					'left join s_category_setting as cs on c.categoryid = cs.categoryid '+
					'where categoryid = \''+categoryid+'\' limit 1';
		//console.log(sql);
		dbConnection.query( sql , function(err, rows, fields) {
			if (err) throw err;
			callback && callback(rows,fields);
			//console.log(rows);
		});	
					
	};
	_that.update = function(categoryid,options){

	};
	_that.create = function(category,callback){
		var category = initCategoryInfo(category),
			c = category.category,
			ci = category.category_info,
			cs = category.s_category_setting,
			cSql = 'INSERT INTO `s_category` (`categoryid` ,`name` ,`typeid` ,`pic` ,`keyword` ,`description` ,`pid` ,`staticpath` ,`gourl`) VALUES (null , \''+c.name+'\', \''+c.typeid+'\', \''+c.pic+'\' , \''+c.keyword+'\', \''+c.description+'\', \''+c.pid+'\', \''+c.staticpath+'\', \''+c.gourl+'\')',
			ciSql = '',
			csSql = '';

		dbConnection.query( cSql , function(err,result) {
			if (err){
				throw err;
			}else{
				c.categoryid = result.insertId;
				dbConnection.query(ciSql,function(err,rows,fields){
					if(err){
						throw err;
					}else{
						dbConnection.query(csSql,function(err,rows,fields)){
							if(err){
								throw err;
							}else{
								callback && callback();
							}
						}
					}
				});
			}
		});	
	};
};

module.exports = Category;