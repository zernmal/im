var Category = getModelFile("category"),
	Type = getModelFile("type"),
	categoryModel = new Category(),
	typeModel = new Type();

module.exports.index = function(req, res){
	categoryModel.getAll({},function(rows,fields){
		res.render('admin/category/index', { title: '栏目列表',categories:rows });
	});
};

module.exports.add = function(req,res){
	categoryModel.getAll({},function(categories,cfields){
		typeModel.getAll(function(types,tfields){
			res.render("admin/category/add",{title:'添加栏目',categories:categories,types:types});
		});
	});
};

module.exports.create = function(req,res){
	categoryModel.create(req.body.category,function(){
		res.render("notic",{msg:'创建栏目成功',gourl:"/admin/category/index"});
	});
};
