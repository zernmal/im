var Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category();
 	
module.exports.index = function(req, res ,methods){
	var categoryid = req.query.categoryid,
		page = req.query.page,
		category = null,
		options = {orderby:{time:"desc"},categoryid:categoryid,page:page};

	methods.getNav(function(nav){
		categoryModel.getAll({},function(categories,cfields){
			category = categories[categoryid];
			if(!category){
				methods.go404(req,res);
				return;
			}
			var tData = { title: '文章列表',
							lastCategories:getLastCategories(categories,categoryid),
							page : page,
							category : category,
							nav : nav
						};
			if(category.isindex==1||category.isindex==2){//列表形式
				options.infonum = category.infonum;
				articleModel.getCustom(options,function(articles,fields){
					tData.articles = articles;
					if(category.isindex==1){
						res.render('../'+category.t_list, tData);
					}else{
						res.render('../'+category.t_listimg, tData);
					}
				});
			}else if(category.isindex==3){//栏目介绍
				res.render('../'+category.t_listb, tData);
			}else{//自定义首页
				res.render('../'+category.t_index, tData);
			}			
		});
	});	//get nav end
};

