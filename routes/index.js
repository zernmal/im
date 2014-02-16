
/*
 * GET home page.
 */

require(__dirname + "/../lib/functions");
var fs = require('fs'),
	Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category();
 
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
		checkAdminLogin =  function(req,res){
			if (!req.session.userid) {
				res.redirect('/admin/login?redirecturl='+req.url);
			}else if(!req.session.isAdmin){
				res.render("notic",{msg:"没有权限",gourl:"/"});					
			}
		},
		methods = {
			go404 : go404,
			getNav : getNav
		};

	//静态文件处理
	app.get(/^\/(public\/.*)/i,function(req,res){
		var	path = require("path"),
			mime = getLibFile("mines").types,
			config = require("../config"),
			pathname = req.params[0],
			//解决安全问题，需要把父目录的两个点去掉
			filepath = path.resolve(__dirname+'/../'+ path.normalize(pathname.replace(/\.\./g, ""))),
			ext = filepath.toString().split(".").pop(),
			zlib = require("zlib");
		if (fs.existsSync(filepath)) {			
			
			//开启Gzip压缩，并以流的形式把文件写到浏览器客户端 
			var raw = fs.createReadStream(filepath),
				acceptEncoding = req.headers['accept-encoding'] || "",
				matched = ext.match(config.compress.match),
				contentType = mime[ext] || "text/plain";
			if (matched && acceptEncoding.match(/\bgzip\b/)) {
			    res.writeHead(200, "Ok", {
			        'Content-Encoding': 'gzip',
			        'Content-Type': contentType
			    });
			    raw.pipe(zlib.createGzip()).pipe(res);
			} else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
			    res.writeHead(200, "Ok", {
			        'Content-Encoding': 'deflate',
			        'Content-Type': contentType
			    });
			    raw.pipe(zlib.createDeflate()).pipe(res);
			} else {
			    res.writeHead(200, "Ok",{'Content-Type': contentType});
			    raw.pipe(res);
			}

			/*fs.readFile(filepath, "binary", function (err, file) {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end(err);
                } else { 
	                var contentType = mime[ext] || "text/plain";               	
                    res.writeHead(200, { 'Content-Type': contentType});
                    res.write(file, "binary");
                    res.end();
                }
            });*/		
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
				
				//获取最新信息	
				articleModel.getCustom({infonum:8,categoryid:"3,9"},function(articles,fields){
					tData.articles = articles;
					articleModel.getCustom({infonum:8,categoryid:13},function(industry,files){
						tData.industry = industry;
						res.render('../templates/index', tData);
					});
				});
						
			});
		});	//get nav end
		 
	});

		//首页
	app.get('/article',function(req,res){		
		getActionFile('article').index(req,res);	
	});


	//进入后台前判断是否登录了，如果未登录直接跳到后台登录页面
/*	app.get(/^\/admin(.*)/,function(req,res){
			if(req.url!="/admin/login"&&req.url!="/admin/loginp"){
				
		  }
	});*/

	app.get('/admin/login',function(req,res){
		getActionFile('admin').login(req,res);					
	});

	//后台登录处理
	app.post('/admin/loginp',function(req,res){
		getActionFile('admin').loginp(req,res);	
	});

	//后台退出
	app.get('/admin/logout',function(req,res){
		getActionFile('admin').logout(req,res);			
	});


	//后台首页
	app.get('/admin',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin').index(req,res);	
	});

	//后台栏目列表
	app.get('/admin/category/index',function(req,res){		
		checkAdminLogin(req,res);
		getActionFile('admin/category').index(req,res);	
	});

	//后台add栏目
	app.get('/admin/category/add',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/category').add(req,res);	
	});

	//后台create栏目
	app.post('/admin/category/create',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/category').create(req,res);	
	});

	//后台edit栏目
	app.get('/admin/category/edit',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/category').edit(req,res);	
	});

	//后台update栏目
	app.post('/admin/category/update',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/category').update(req,res);	
	});

	//后台destroy栏目
	app.get('/admin/category/destroy',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/category').destroy(req,res);	
	});


	//后台 article列表
	app.get('/admin/article/index',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/article').index(req,res);	
	});

	//后台add article
	app.get('/admin/article/add',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/article').add(req,res);	
	});

	//后台destroy article
	app.get('/admin/article/destroy',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/article').destroy(req,res);	
	});

	//后台edit article
	app.get('/admin/article/edit',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/article').edit(req,res);	
	});

	//后台update article
	app.post('/admin/article/update',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/article').update(req,res);	
	});

	//后台create article
	app.post('/admin/article/create',function(req,res){
		checkAdminLogin(req,res);
		getActionFile('admin/article').create(req,res);	
	});

	//后台系统信息
	app.get('/admin/system/index',function(req,res){
		checkAdminLogin(req,res);
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

	app.get('/mytest/:method',function(req,res){
		var method = req.params['method'],
			mytestAction = getActionFile('mytest');
		if(!method){
			mytestAction.index(req,res,methods);
		}else{
			if(mytestAction[method]){
				mytestAction[method](req,res,methods);
			}else{
				go404(req,res);
			}
		}
	});

	//kindeditor编辑器文件上传
	app.post('/fileupload',function(req,res){

		var rootUploadPath = '/public/uploads/',
			path = require("path"),
			date = new Date(),
			dateDir = date.getFullYear()+"-"+(parseInt(date.getMonth())+1).toString(),
			targetDir = 'public/uploads/' +dateDir,
			tmpPath = req.files.imgFile.path,
			fileName = date.getTime()+""+parseInt(Math.random()*100)+"."+req.files.imgFile.name.split(".").pop(),
			savePath = path.resolve(targetDir + '/' + fileName),
			saveUrl =  '/'+ targetDir + '/' + fileName ,
			moveFile = function(){
				console.log(savePath);
				fs.rename(tmpPath, savePath, function(err) {
					if (err) {
						throw err;
						var resJson = {'error' : 1, 'url' : ''};
					}else{
						
						var resJson = {'error' : 0, 'url': saveUrl};
					}
					res.send(resJson);		
				});
			};

			//如果不存在上期目录就创建一个
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
				
	});

	//404页面处理
	app.use(function (req, res) {
		go404(req,res);
	});
};