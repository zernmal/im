
/*
 * GET home page.
 */
var fs = require('fs'),
	thePath = require("path");
	require(__dirname + "/../lib/functions");

 
module.exports = function(app) {
	
	var go404 = function(rq,rs){
		rs.send(404, 'Sorry, we cannot find that!');
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
		res.render('../templates/index', { title: 'Express' }); 
	});

		//首页
	app.get('/article',function(req,res){		
		getActionFile('article').index(req,res);	
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
	

	//404页面处理
	app.use(function (req, res) {
		go404(req,res);
	});
};