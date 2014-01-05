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
	var category = req.body.category;
	category.picfile = req.files.picfile;
	categoryModel.create(category,function(){
		res.render("notic",{msg:'创建栏目成功',gourl:"/admin/category/index"});
	});
};


module.exports.edit = function(req,res){
	var categoryid = req.query.categoryid;
	categoryModel.getAll({},function(categories,cfields){
		typeModel.getAll(function(types,tfields){
			categoryModel.get(categoryid,function(category,cfields){
				res.render("admin/category/edit",{title:'编辑栏目',categories:categories,types:types,category:category});
			});			
		});
	});
};


module.exports.update = function(req,res){
	var categoryid = req.query.categoryid,
		category = req.body.category;
	category.picfile = req.files.picfile;

	console.log(req.files);

	categoryModel.update(categoryid,category,function(){
		res.render("notic",{msg:'更新栏目成功',gourl:"/admin/category/index"});
	});
};

module.exports.destroy = function(req,res){
	var categoryid = req.query.categoryid;
	categoryModel.destroy(categoryid,function(){
		res.render("notic",{msg:'删除栏目成功',gourl:"/admin/category/index"});
	},function(errNum){
		if(errNum==1){
			res.render("notic",{msg:'失败！请先删除或移动栏目下的文章',gourl:"/admin/category/index"});
		}else{
			res.render("notic",{msg:'删除栏目失败',gourl:"/admin/category/index"});
		}
	});
};
