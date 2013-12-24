getLibFile("db");
var extend = require("node.extend"),
	Category = getModelFile("category"),
	categoryModel = new Category(),
	mysql = require("mysql");
var Article = function(){
	var _that = this;

	_that.get = function(articleid,callback){//获取一篇文章的内容

	};
	_that.getCustom = function(options,callback){//获取定制条数的信息，可用于分页是显示
		options = options || {};
		var articleSql = '',
			commentSql = '',
			attachmentSql = '',
			goArticleQuery = function(){
				console.log(articleSql);
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
					articleSql = 'select * from i_article as a ' +
						'left join i_article_info as ai on a.articleid = ai.articleid ';
				}else{//只显示基本状态信息
					articleSql = 'select * from i_article as a ';
				}
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
						articleSql += ' where a.categoryid in('+inC.join(",")+') ';
						orderLimit();
						
					});				
				}else{
					orderLimit();
				}
			};

		addLimit();
		categoryLimit();
		
	};
};

module.exports = Article;