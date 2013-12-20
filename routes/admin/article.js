module.exports.index = function(req, res){
	res.render('admin/article/index', { title: '文章列表' });
};