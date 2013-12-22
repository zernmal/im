var Category = getModelFile("category"),
	categoryModel = new Category()
	categories = categoryModel.getAllCategory();

module.exports.index = function(req, res){
	res.render('admin/category/index', { title: '栏目列表' });	
	
};

module.exports.add = function(req,res){
	console.log(categories);
	res.render("admin/category/add",{title:'添加栏目'});
}

module.exports.create = function(req,res){
	console.log(req.params);
	res.render("admin/category/add",{title:'创建栏目'});
}
