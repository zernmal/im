var Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category(),
	typeid = 1;//文章的类型id为1


module.exports.index = function(req, res, methods){
	methods.getNav(function(nav){
		categoryModel.getAll({},function(categories,cfields){
			articleModel.get(req.query.articleid,function(article,afields){
				var tData = {
						title : article.title,
						lastCategories:getLastCategories(categories,article.categoryid),
						nav : nav,
						article : article,
						category : categories[article.categoryid]
					};
				res.render('../templates/article/article', tData);
			});
		});
	});
	//res.render('article/index', { title: 'article' });
};
