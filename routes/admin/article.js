var Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category(),
	typeid = 1;//文章的类型id为1

module.exports.index = function(req, res){
	
	articleModel.getCustom({orderby:{time:"desc"}},function(articles,fields){
		res.render('admin/article/index', { title: '文章列表',articles:articles});
	});
};

module.exports.add = function(req,res){
	categoryModel.getAll({typeid : typeid },function(categories,cfields){
		res.render('admin/article/add', { title: '添加文章', categories: categories});
	});
};

module.exports.create = function(req,res){
	var article = req.body.article;
	article.picfile = req.files.picfile;
	articleModel.create(article,function(){
		res.render("notic",{msg:'创建信息成功',gourl:"/admin/article/index"});
	});
};


module.exports.update = function(req,res){
	var articleid = req.query.articleid;
	if(!articleid){
		res.render("notic",{msg:'请传入文章id',gourl:"/admin/article/index"});
	}else{
		article = req.body.article;
		article.picfile = req.files.picfile;
		articleModel.update(articleid,article,function(){
			res.render("notic",{msg:'编辑信息成功',gourl:"/admin/article/index"});
		});
	}
};

module.exports.edit = function(req,res){
	var articleid = req.query.articleid;
	if(!articleid){
		res.render("notic",{msg:'请传入文章id',gourl:"/admin/article/index"});
	}else{
		categoryModel.getAll({typeid : typeid },function(categories,cfields){
			articleModel.get(articleid,function(article,afields){
				res.render('admin/article/edit', { title: '编辑文章', categories: categories,article:article});
			});			
		});
	}	
};

module.exports.destroy = function(req,res){
	var articleid = req.query.articleid;
	if(!articleid){
		res.render("notic",{msg:'请传入文章id',gourl:"/admin/article/index"});
	}else{
		articleModel.destroy(articleid,function(){
			res.render("notic",{msg:'删除信息成功',gourl:"/admin/article/index"});
		});
	}	
};
