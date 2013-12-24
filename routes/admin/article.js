var Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category();

module.exports.index = function(req, res){
	
	articleModel.getCustom({categoryid:5,add : true,orderby:{time:"desc"}},function(rows,fields){
		res.render('admin/article/index', { title: '文章列表',articles:[]});
	});
};

module.exports.add = function(req,res){
	categoryModel.getAll({typeid : 1 },function(categories,cfields){
		res.render('admin/article/add', { title: '添加文章', categories: categories});
	});
};
