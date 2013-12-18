module.exports.index = function(req, res){
	
	getLibFile("db");
	//console.log(dbConnection);
	res.render('admin/category/index', { title: '栏目列表' });	
	
};