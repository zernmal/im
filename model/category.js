getLibFile("db");
var extend = require("node.extend"),
	fs = require("fs"),
	mysql = require("mysql");
var Category = function(){
	var _that = this,
		toDbCategoryInfo = function(jsonTypeCategory){
			var c = jsonTypeCategory,
				category = {
					//对应s_category表
					category : {
						categoryid : c.categoryid || null,
						name : c.name || "",
						typeid : c.typeid || 1,
						pic : c.pic || "/public/uploads/default.jpg",
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
		},
		toJsonCategoryInfo = function(dbTypeCategoryInfo){

		};
	
	_that.getAll = function(options,callback){
		options = options || {};
		var sql = 'select * from s_category as c ' +
					'left join s_category_info as ci on c.categoryid = ci.categoryid '+
					'left join s_category_setting as cs on c.categoryid = cs.categoryid ';
		//console.log(sql);
		if(options.typeid){
			sql += ' where c.typeid = '+options.typeid+' ';
		}

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
					'where c.categoryid = \''+categoryid+'\' limit 1';
		dbConnection.query( sql , function(err, rows, fields) {
			if (err) throw err;
			callback && callback(rows[0],fields);
			//console.log(rows);
		});	
					
	};
	_that.create = function(category,sCallback,fCallback){
		var  picfile = category.picfile,
			category = toDbCategoryInfo(category),
			c = category.category,
			ci = category.category_info,
			cs = category.s_category_setting;
		dbConnection.query( 'INSERT INTO s_category SET ?', c , function(err,result) {
			if (err){
				throw err;
				fCallback && fCallback();
			}else{
				ci.categoryid = result.insertId;
				dbConnection.query('INSERT INTO s_category_info SET ?', ci ,function(err,rows,fields){
					if(err){
						throw err;
						fCallback && fCallback();
					}else{
						cs.categoryid = result.insertId;
						dbConnection.query('INSERT INTO s_category_setting SET ?',cs,function(err,rows,fields){
							if(err){
								throw err;
								fCallback && fCallback();
							}else{
								
								//上传栏目标题图片
								if(picfile&&picfile.name){//如果有上传文件，则执行文件上传操作 
									var target_path = "public/uploads/category/" + ci.categoryid + "." + picfile.name.split(".").pop();
									
									fs.rename(picfile.path, target_path, function(err) {
										if (err) throw err;
										dbConnection.query("update s_category set ? where categoryid = "+ci.categoryid+"",{pic:"/"+target_path},function(err,result){
											//不管有没有移动成功，都执行回调		
											var desC = extend(c,ci,cs);
											sCallback && sCallback(desC);
										});
									});
								}else{
									var desC = extend(c,ci,cs);
									sCallback && sCallback(desC);
								}								
							}
						});//s_category_setting
					}
				});//s_category_info
			}
		});//s_category	
	};
	_that.update = function(categoryid,category,sCallback,fCallback){
		category.categoryid = categoryid;
		var picfile = category.picfile,
			category = toDbCategoryInfo(category),
			c = category.category,
			ci = category.category_info,
			cs = category.s_category_setting;
		dbConnection.query("update s_category set ? where categoryid = "+categoryid+"",c,function(err,result){
			if(err){
				throw err,
				fCallback && fCallback();
			}else{
				dbConnection.query("update s_category_info set ? where categoryid = "+categoryid+"",ci,function(err,result){
					if(err){
						throw err;
						fCallback && fCallback();
					}else{
						dbConnection.query("update s_category_setting set ? where categoryid = "+categoryid+"",cs,function(err,result){
							if(err){
								throw err;
								fCallback && fCallback();
							}else{

								//上传栏目标题图片
								if(picfile&&picfile.name){//如果有上传文件，则执行文件上传操作 
									var target_path = "public/uploads/category/" + categoryid + "." + picfile.name.split(".").pop();
									
									fs.rename(picfile.path, target_path, function(err) {
										if (err) throw err;
										dbConnection.query("update s_category set ? where categoryid = "+categoryid+"",{pic:"/"+target_path},function(err,result){
											//不管有没有移动成功，都执行回调		
											sCallback && sCallback();
										});
									});
								}else{
									sCallback && sCallback();
								}
							}
						});	
					}
				});	
			}			
		});
	};
	_that.destroy = function(categoryid,sCallback,fCallback){
		dbConnection.query("DELETE FROM s_category WHERE categoryid = "+categoryid+"",function(err,result){
			if(err){
				throw err;
				fCallback && fCallback();
			}else{
				//删除完栏目状态信息后再删除栏目内容和设计信息
				dbConnection.query("DELETE FROM s_category_info WHERE categoryid = "+categoryid+"",function(err,result){
					if(err) throw err;
					
					dbConnection.query("DELETE FROM s_category_setting WHERE categoryid = "+categoryid+"",function(err,result){
						if(err) throw err;
						sCallback && sCallback();
					});
				});
				
			}
		});
		sCallback && sCallback();
	};
};

module.exports = Category;