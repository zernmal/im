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
						pic : a.pic || "",
						keyword : a.keyword || "",
						description : a.description || "",
						time : a.time || getDatetime((new Date()).getTime()/1000),
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
		};

	_that.get = function(articleid,callback){//获取一篇文章的内容
		var sql = 'select *, date_format(a.time,\'%Y-%m-%d %H:%i:%s\') as time from i_article as a ' +
				'left join i_article_info as ai on a.articleid = ai.articleid ' +
				'where a.articleid = \''+articleid+'\' limit 1';
		dbConnection.query( sql , function(err, rows, fields) {
			if (err) throw err;
			callback && callback(rows[0],fields);
		});	
	};
	_that.getCustom = function(options,callback){//获取定制条数的信息，可用于分页是显示
		options = options || {};
		var articleSql = '',
			commentSql = '',
			attachmentSql = '',
			goArticleQuery = function(){
				dbConnection.query( articleSql , function(err, rows, fields) {
					if (err){
						throw err;
					}else{
						callback && callback(rows,fields);
					}

				}); 
			},
			addLimit = function(){
				if(options.add){//显示更多信息
					articleSql = 'select *, date_format(a.time,\'%Y-%m-%d %H:%i:%s\') as time from i_article as a ' +
						'left join i_article_info as ai on a.articleid = ai.articleid ';
				}else{//只显示基本状态信息
					articleSql = 'select * from i_article as a ';
				}
				articleSql += 'where a.isdeleted = 0 ';

			},
			numLimit = function(){
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
					dbConnection.query("select categoryid from s_category where pid = "+options.categoryid+" ",function(err,rows,fields){
						var inC = [options.categoryid];
						for(var i = 0 ; i < rows.length ; i++){
							inC.push(rows[i].categoryid);
						}
						articleSql += ' and a.categoryid in('+inC.join(",")+') ';
						orderLimit();
						
					});				
				}else{					
					orderLimit();
				}
			};

		addLimit();
		categoryLimit();		
	};

	_that.create = function(article,sCallback,fCallback){

		
		var picfile = article.picfile,
			article = toDbArticleInfo(article),
			a = article.article,
			ai = article.article_info;
		dbConnection.query( 'INSERT INTO i_article SET ?', a , function(err,result) {
			if (err){
				throw err;
				fCallback && fCallback();
			}else{
				ai.articleid = result.insertId;
				dbConnection.query('INSERT INTO i_article_info SET ?', ai ,function(err,rows,fields){
					if(err){
						throw err;
						fCallback && fCallback();
					}else{

						var targetDir = './public/article/' + ai.articleid + "." + picfile.name.split(".").pop(); 
						console.log(targetDir);
						var desC = extend(a,ai);
						sCallback && sCallback(desC);
					}
				});//s_article_info
			}
		});//s_article	
	};

	_that.destroy = function(articleid,sCallback,fCallback){
		dbConnection.query("update i_article set ? where articleid = "+articleid+"",{isdeleted:1},function(err,result){
			if(err){
				throw err,
				fCallback && fCallback();
			}else{
				sCallback && sCallback();	
			}			
		});	
	};

	_that.update = function(articleid,article,sCallback,fCallback){
		article.articleid = articleid;
		var article = toDbArticleInfo(article),
			a = article.article,
			ai = article.article_info;
		dbConnection.query("update i_article set ? where articleid = "+articleid+"",a,function(err,result){
			if(err){
				throw err,
				fCallback && fCallback();
			}else{
				dbConnection.query("update i_article_info set ? where articleid = "+articleid+"",ai,function(err,result){
					if(err){
						throw err;
						fCallback && fCallback();
					}else{
						sCallback && sCallback(result);
					}
				});	
			}			
		});	
	};
};

module.exports = Article;