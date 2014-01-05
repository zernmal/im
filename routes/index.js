
/*
 * GET home page.
 */

require(__dirname + "/../lib/functions");
var fs = require('fs'),
	Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category();
	thePath = require("path");


 
module.exports = function(app) {
	
	//初始化模板方法
	app.locals.getArticles = function(options,callback){
		options = options || {};
		var customOpt = {
			categoryid : options.categoryid || 0 ,
			infonum : options.infonum || 8 ,
			isrecommend : options.isrecommend || false,
			istop : options.istop || false,
			orderby : options.orderby || {time:"desc"}
		}; 
		articleModel.getCustom(customOpt,function(articles,fields){
			callback && callback(articles);
		});		
	}

	//定义好一些公用方法 
	var go404 = function(rq,rs){
			rs.send(404, 'Sorry, we cannot find that!');
		},
		getNav = function(callback){
			categoryModel.getAll({},function(categories,cfields){
				var nav = [{name:"首页",url:"/",categoryid:0}];
				for(var i in categories){
					if(categories[i].pid==0&&categories[i].mshow){
						nav.push({
							name : categories[i].name,
							url : categories[i].url,
							categoryid : categories[i].categoryid
						});
					}
				}
				callback && callback(nav);
			});
		},
		methods = {
			go404 : go404,
			getNav : getNav
		};

	//静态文件处理
	app.get(/^\/(public\/.*)/i,function(req,res){
		var path = req.params[0],
			filepath = thePath.resolve(__dirname + '/../'+path);
		if (fs.existsSync(filepath)) {
			fs.createReadStream(filepath).pipe(res);
			return;			
		}else{
			go404(req,res);
		}
	});

	//首页
	app.get('/',function(req,res){

		getNav(function(nav){
			categoryModel.getAll({},function(categories,cfields){				
				var tData = { title: '壹圆广告点点评网',
								categories : categories,
								nav : nav,
								category : {
									categoryid : 0,
									name : "首页",
									url : "/"
								}
							};
					
				articleModel.getCustom({infonum:8},function(articles,fields){
					tData.articles = articles;
					res.render('../templates/index', tData);
				});
						
			});
		});	//get nav end
		 
	});

		//首页
	app.get('/article',function(req,res){		
		getActionFile('article').index(req,res);	
	});


	//进入后台前判断是否登录了，如果未登录直接跳到后台登录页面
	app.get(/\/admin.*/,function(req,res){
		console.log(req.session.userid);
		if(req.url!="/admin/loginp"){
			if(!req.session.userid){
				res.render('admin/login', {title:"后台登录",redirect_url:"/admin"});
			}
		}
	});	

	//后台登录处理
	app.post('/admin/loginp',function(req,res){
		getActionFile('admin').loginp(req,res);	
	});

	//后台首页
	app.get('/admin',function(req,res){
		getActionFile('admin').index(req,res);	
	});

	//后台栏目列表
	app.get('/admin/category/index',function(req,res){
		getActionFile('admin/category').index(req,res);	
	});

	//后台add栏目
	app.get('/admin/category/add',function(req,res){
		getActionFile('admin/category').add(req,res);	
	});

	//后台create栏目
	app.post('/admin/category/create',function(req,res){
		getActionFile('admin/category').create(req,res);	
	});

	//后台edit栏目
	app.get('/admin/category/edit',function(req,res){
		getActionFile('admin/category').edit(req,res);	
	});

	//后台update栏目
	app.post('/admin/category/update',function(req,res){
		getActionFile('admin/category').update(req,res);	
	});

	//后台destroy栏目
	app.get('/admin/category/destroy',function(req,res){
		getActionFile('admin/category').destroy(req,res);	
	});


	//后台 article列表
	app.get('/admin/article/index',function(req,res){
		getActionFile('admin/article').index(req,res);	
	});

	//后台add article
	app.get('/admin/article/add',function(req,res){
		getActionFile('admin/article').add(req,res);	
	});

	//后台destroy article
	app.get('/admin/article/destroy',function(req,res){
		getActionFile('admin/article').destroy(req,res);	
	});

	//后台edit article
	app.get('/admin/article/edit',function(req,res){
		getActionFile('admin/article').edit(req,res);	
	});

	//后台update article
	app.post('/admin/article/update',function(req,res){
		getActionFile('admin/article').update(req,res);	
	});

	//后台create article
	app.post('/admin/article/create',function(req,res){
		getActionFile('admin/article').create(req,res);	
	});

	//后台系统信息
	app.get('/admin/system/index',function(req,res){
		getActionFile('admin/system').index(req,res);	
	});
	
	//前台文章内容页
	app.get('/article/:id',function(req,res){
		var idReg = /^\d+$/ ;
		if(idReg.test(req.params["id"])){	
			req.query.articleid = req.params["id"];
			getActionFile('article').index(req,res,methods);
		}else{
			res.send(404, 'Sorry, we cannot find that!');
		}
	})

	//前台栏目页
	app.get('/category/:id',function(req,res){
		var idReg = /^\d+(_\d+)?$/ ,
			id = req.params['id'],
			curPage = 1;
		if(idReg.test(id)){
			id = id.split("_");
			if(id[1]){
				curPage = id[1];
			}
			req.query.categoryid = id[0];
			req.query.curPage = curPage;			
			getActionFile('category').index(req,res,methods);
		}else{
			res.send(404, 'Sorry, we cannot find that!');
		}
	})

	//404页面处理
	app.use(function (req, res) {
		go404(req,res);
	});
};