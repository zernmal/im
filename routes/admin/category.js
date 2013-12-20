module.exports.index = function(req, res){
	
	var Category = getModelFile("category"),
		categoryModel = new Category()
		categories = categoryModel.getAllCategory();
	//console.log(dbConnection);
	console.log(categories);
	res.render('admin/category/index', { title: '栏目列表' });	
	
};