var Article = getModelFile("article"),
	Category = getModelFile("category"),
	articleModel = new Article(),
	categoryModel = new Category();
 	
module.exports.index = function(req, res ,methods){
	var categoryid = req.query.categoryid,
		curPage = req.query.curPage,
		category = null,
		options = {orderby:{time:"desc"},categoryid:categoryid,curPage:curPage};

	
	methods.getCommonData(function(data){
		categoryModel.getAll({},function(categories,cfields){
			category = categories[categoryid];
			if(!category){
				methods.go404(req,res);
				return;
			}
			var tData = { title: category.name,
							lastCategories:getLastCategories(categories,categoryid),
							category : category,
							nav : data.nav,
							books : data.books
						};
			if(category.isindex==1||category.isindex==2){//列表形式
				options.infonum = category.infonum;
				articleModel.getCustom(options,function(articles,fields){
					tData.articles = articles;
					articleModel.getPage({categoryid:1,infonum:category.infonum,cur:curPage},function(page){
						tData.page = page;
						if(category.isindex==1){
							res.render('../'+category.t_list, tData);
						}else{
							res.render('../'+category.t_listimg, tData);
						}
					});
				});
			}else if(category.isindex==3){//栏目介绍
				res.render('../'+category.t_listb, tData);
			}else{//自定义首页
				res.render('../'+category.t_index, tData);
			}			
		});
	});	//get nav end

};

