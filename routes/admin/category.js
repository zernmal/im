module.exports.index = function(req, res){
	
	res.render('admin/category/index', { title: '栏目列表' });	
	
};

module.exports.add = function(req,res){
	res.render("admin/category/add",{title:'添加栏目'});
}