getLibFile("db");

var extend = require("node.extend"),
	Category = getModelFile("category"),
	categoryModel = new Category(),
	mysql = require("mysql"),
	fs = require("fs");
var Article = function(){
	var _that = this,
		toDbArticleInfo = function(jsonTypeArticle){
			var a = jsonTypeArticle,
				article = {
					article : {
						articleid : a.articleid || null,
						categoryid : a.categoryid || 0,
						title : a.title || "",
						pic : a.pic || "/public/uploads/default.jpg",
						keyword : a.keyword || "",
						description : a.description || "",
						time : a.time || getDatetime((new Date()).getTime()),
						commentnum : a.commentnum || 0,
						isrecommend : a.isrecommend || 0,
						istop : a.istop || 0,
						attachmentnum : a.attachmentnum || 0,
						userid : a.userid || 0,
						writer : a.writer || "",
						from : a.from || "",
						click : a.click || 0,
						isdeleted : a.isdeleted || 0
					},
					article_info : {
						articleid : a.articleid || null,
						content : a.content || ""
					}
				};
			return article;
		},
		getSubStr = function(categoryid,callback){
			categoryid = parseInt(categoryid);
			DBpool.getConnection(function(err, connection) {
				connection.query("select categoryid from s_category where pid = "+categoryid+" ",function(err,rows,fields){
					var inC = [categoryid];
					for(var i = 0 ; i < rows.length ; i++){
						inC.push(rows[i].categoryid);
					}
					connection.release();
					callback && callback(inC.join(","));							
				});	
			});
			
		};

	_that.get = function(articleid,callback){//获取一篇文章的内容
		DBpool.getConnection(function(err, connection) {
			var urlSql = articleUrl(0,{sql:true,tableName:"a"});
			var sql = 'select *, date_format(a.time,\'%Y-%m-%d %H:%i:%s\') as time ,'+ urlSql +' from i_article as a ' +
					'left join i_article_info as ai on a.articleid = ai.articleid ' +
					'where a.articleid = \''+articleid+'\' limit 1';
			connection.query( sql , function(err, rows, fields) {
				if (err) throw err;
				var article = rows[0];
				if(!article){//如果找不到对应的文章
					callback(false);
				}else{			
					getSubStr(article.categoryid,function(inC){
						var nextSql = "select a.title,a.articleid,"+ urlSql +" from i_article as a where a.time > '"+article.time+"' and a.categoryid in("+inC+") order by a.articleid desc limit 1",
							prevSql = "select a.title,a.articleid,"+ urlSql +" from i_article as a where a.time < '"+article.time+"' and a.categoryid in("+inC+") order by a.articleid desc  limit 1";

						connection.query(nextSql,function(err,next,nfields){
							if(next&&next[0]){
								article.next = next[0];
							}else{
								article.next = {
										articleid : 0,
										url : "javascript:",
										title : "已经是最后一篇了"
									};
							}
							connection.query(prevSql,function(err,prev,pfields){					
								if(prev&&prev[0]){
									article.prev = prev[0];
								}else{
									article.prev = {
											articleid : 0,
											url : "javascript:",
											title : "已经是第一篇了"
										};
								}
								connection.release();
								callback && callback(article,fields);					
							});
						});
					});// inC end	
				}//if article
			});
		});

				
	};
	_that.getCustom = function(options,callback){//获取定制条数的信息，可用于分页是显示
		DBpool.getConnection(function(err, connection) {
			options = options || {};
			var articleSql = '',
				commentSql = '',
				attachmentSql = '',
				curPage = options.curPage || 1,
				infonum = options.infonum || 25,
				urlSql = articleUrl(0,{sql:true,tableName:"a"});
				goArticleQuery = function(){
					connection.query( articleSql , function(err, rows, fields) {
						if (err){
							throw err;
						}else{
							connection.release();
							callback && callback(rows,fields);
						}

					}); 
				},
				addLimit = function(){
					if(options.add){//显示更多信息
						articleSql = 'select *, date_format(a.time,\'%Y-%m-%d %H:%i:%s\') as time ,'+urlSql+' from i_article as a ' +
							'left join i_article_info as ai on a.articleid = ai.articleid ';
					}else{//只显示基本状态信息
						articleSql = 'select *, date_format(a.time,\'%Y-%m-%d %H:%i:%s\') as time ,'+urlSql+' from i_article as a ';
					}
					articleSql += 'where a.isdeleted = 0 ';

				},
				numLimit = function(){
					articleSql += ' limit '+ ((curPage-1)*infonum+1) + ',' + infonum + ' ';
					goArticleQuery();
				},
				orderLimit = function(){
					var orderByStr = [];
					if(options.orderby){//这里限制，只能根据i_article表里面的字段排序
						for(var i in options.orderby){
							var oy = options.orderby[i];
							orderByStr.push("a."+i+" "+oy);
						}
						articleSql += " order by "+orderByStr.join(",")+" ";

						numLimit();
					}else{
						numLimit();
					}
				},
				categoryLimit = function(){
					if(options.categoryid){//获取该栏目下面的所有子栏目的文章列表				
						getSubStr(options.categoryid,function(inC){
							articleSql += ' and a.categoryid in('+inC+') ';
							orderLimit();
						})			
					}else{					
						orderLimit();
					}
				};

			addLimit();
			categoryLimit();	
		});			
	};

	_that.getPage = function(options,callback){
		
		if(!options||!options.categoryid){
			callback&&callback(false);
		}

		DBpool.getConnection(function(err, connection) {
			var infonum = options.infonum || 25,
			cur = options.cur || 1,			
			sql = "select count(*) as total from i_article as a ",
			page = {cur:cur,infonum: infonum},
			nextPage = function(){
				connection.query(sql,function(err,rows,fields){
					if(err){
						throw err;
					}
					var total = rows[0].total,
						list = [];
					page.totalPage = Math.ceil(total/infonum)
					page.totalNum = total;
					if(cur<page.totalPage){
						page.next = categoryUrl(options.categoryid,{curPage:parseInt(cur)+1});
					}else{
						page.next = "";//没有下一页了
					}

					for(var i = 1 ; i <= page.totalPage ; i++){
						list.push({
							num : i,
							url : categoryUrl(options.categoryid,{curPage:i})		
						});
					}
					page.list = list;
					connection.release();
					callback && callback(page);
				});
			},
			prevPage = function(){
				if(cur==1){
					page.prev = "";//没有上一页了
				}else if(cur==2){
					page.prev = categoryUrl(options.categoryid);
				}else{
					page.prev = categoryUrl(options.categoryid,{curPage:cur-1});
				}
				nextPage();
			};

			getSubStr(options.categoryid,function(inC){
				sql += ' where a.categoryid in('+inC+') ';
				prevPage();
			});
			
		});// dbpool getconnention  end		
	};
	_that.create = function(article,sCallback,fCallback){

		DBpool.getConnection(function(err, connection) {
			var picfile = article.picfile,
				article = toDbArticleInfo(article),
				a = article.article,
				ai = article.article_info;
			connection.query( 'INSERT INTO i_article SET ?', a , function(err,result) {
				if (err){
					throw err;
					fCallback && fCallback();
				}else{
					ai.articleid = result.insertId;
					connection.query('INSERT INTO i_article_info SET ?', ai ,function(err,rows,fields){
						if(err){
							throw err;
							fCallback && fCallback();
						}else{
							//标题图片
							if(picfile&&picfile.name){//如果有上传文件，则执行文件上传操作 
								var date = new Date(),
									tmp_path = picfile.path,
									dateDir = date.getFullYear()+"-"+(parseInt(date.getMonth())+1).toString(),
									targetDir = 'public/uploads/article/'+ dateDir ,//直接将网站目录
									target_path = targetDir + "/" + ai.articleid + "." + picfile.name.split(".").pop(),
									moveFile = function(){
										fs.rename(tmp_path, target_path, function(err) {
											if (err) throw err;
											connection.query("update i_article set ? where articleid = "+ai.articleid+"",{pic:"/"+target_path},function(err,result){
												connection.release();
												//不管有没有移动成功，都执行回调	
												var desC = extend(a,ai);
												sCallback && sCallback(desC);
											});
										});
									}; 						

								fs.exists(targetDir,function(exists){
									if(exists){
										moveFile();
									}else{
										fs.mkdir(targetDir,function(err){
											if(err) throw err;
											
											//不管有没有创建文件夹成功都执行移动文件操作，因为在里面执行回调
											moveFile();
										});
									}
								});
							}else{
								connection.release();
								var desC = extend(a,ai);
								sCallback && sCallback(desC);
							}
						}
					});//s_article_info
				}
			});//s_article	
		});
	};

	_that.destroy = function(articleid,sCallback,fCallback){
		DBpool.getConnection(function(err, connection) {
			connection.query("update i_article set ? where articleid = "+articleid+"",{isdeleted:1},function(err,result){				
				connection.release();
				if(err){
					throw err,
					fCallback && fCallback();
				}else{
					sCallback && sCallback();	
				}			
			});
		});

	};

	_that.update = function(articleid,article,sCallback,fCallback){
		article.articleid = articleid;
		var picfile = article.picfile,
			article = toDbArticleInfo(article),
			a = article.article,
			ai = article.article_info;

		DBpool.getConnection(function(err, connection) {
			connection.query("update i_article set ? where articleid = "+articleid+"",a,function(err,result){
				if(err){
					throw err,
					fCallback && fCallback();
				}else{
					connection.query("update i_article_info set ? where articleid = "+articleid+"",ai,function(err,result){
						if(err){
							throw err;
							fCallback && fCallback();
						}else{
							//标题图片处理
							if(picfile&&picfile.name){//如果有就上传文件，则执行文件上传操作
								var date = new Date(),
									tmp_path = picfile.path,
									dateDir = date.getFullYear()+"-"+(parseInt(date.getMonth())+1).toString(),
									targetDir = 'public/uploads/article/'+ dateDir ,//直接将网站目录
									target_path = targetDir + "/" + ai.articleid + "." + picfile.name.split(".").pop(),
									moveFile = function(){
										fs.rename(tmp_path, target_path, function(err) {
											if (err) throw err;
											connection.query("update i_article set ? where articleid = "+articleid+"",{pic:"/"+target_path},function(err,result){
												connection.release();
												//不管有没有移动成功，都 执行回调
												sCallback && sCallback(result);
											});
										});
									}; 						

								fs.exists(targetDir,function(exists){
									if(exists){
										moveFile();
									}else{
										fs.mkdir(targetDir,function(err){
											if(err) throw err;
											
											//不管有没有创建文件夹成功都执行移动文件操作，因为在里面执行回调
											moveFile();
										});
									}
								});
							}else{
								connection.release();
								sCallback && sCallback(result);
							}
						}
					});// update ai end	
				}			
			});	// update a end
		});	// dbpool getconnection end 		
	};
};

module.exports = Article;