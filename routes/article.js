var Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category(),
	typeid = 1;//文章的类型id为1


module.exports.index = function(req, res, methods){
	methods.getCommonData(function(data){
		categoryModel.getAll({},function(categories,cfields){
			articleModel.get(req.query.articleid,function(article,afields){
				if(!article){
					methods.go404(req,res);
				}else{
					var tData = {
							title : article.title,
							lastCategories:getLastCategories(categories,article.categoryid),
							nav : data.nav,
							books : data.books,
							article : article,
							category : categories[article.categoryid]
						};
					res.render('../templates/article/article', tData);
				}
			});
		});
	});
	//res.render('article/index', { title: 'article' });
};