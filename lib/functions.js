global.getLibFile = function(filename){

		return require(__dirname+"/"+filename);
};
global.getModelFile = function(filename){
	return require(__dirname+"/../model/"+filename);
};
global.getActionFile = function(filename){
	return require(__dirname+"/../routes/"+filename);
};
global.getDatetime = function(time){//将javascript getTime出来的时间变成datetime格式
	var temp = new Date(time),
		padStr = function(i) {
		    return (i < 10) ? "0" + i : "" + i;
		},
		dateStr = padStr(temp.getFullYear()) + "-" +
                  padStr(1 + temp.getMonth()) + "-" +
                  padStr(temp.getDate()) + " " +
                  padStr(temp.getHours()) + ":" +
                  padStr(temp.getMinutes()) + ":" +
                  padStr(temp.getSeconds());
    return dateStr;
};
global.articleUrl = function(articleid,options){
	
	options = options || {};
	if(options.sql){//需要直接返回sql语句来获取url的
		if(options.tableName){
			options.tableName = options.tableName+".";
		}else{
			options.tableName = "";
		}
		return " CONCAT('/article/',"+options.tableName+"articleid) AS url ";
	}else{
		return "/article/"+articleid;
	}
};
global.categoryUrl = function(categoryid,options){
	options = options || {};
	if(options.sql){//需要直接返回sql语句来获取url的
		if(options.tableName){
			options.tableName = options.tableName+".";
		}else{
			options.tableName = "";
		}
		return " CONCAT('/category/',"+options.tableName+"categoryid) AS url ";
	}else{
		if(options.curPage&&options.curPage>1){
			return "/category/"+categoryid+"_"+options.curPage;
		}else{
			return "/category/"+categoryid;
		}		
	}

};
global.getLastCategories = function(allCatetories,curCategoryid){//用于显示在左侧的栏目列表
	var lastC = {},
		hasSub = false;
	lastC.curCategory = allCatetories[curCategoryid]; 
	lastC.subCategories = [];
	lastC.topCategory = null;
	for(var i  in allCatetories){
		if(allCatetories[i].pid==curCategoryid){//有子栏目，把topCategory变成当前栏目，并填充子栏目 
		lastC.subCategories.push(allCatetories[i]);
			hasSub = true;
		}
	}

	if(!hasSub){//没有子栏目
		if(lastC.curCategory.pid!=0){//有上级栏目 ，把topcategory变成当前栏目的上级栏目
			lastC.topCategory = allCatetories[lastC.curCategory.pid];
			for(var i  in allCatetories){
				if(allCatetories[i].pid==lastC.curCategory.pid){
					lastC.subCategories.push(allCatetories[i]);
				}
			}
		}else{ 				
			lastC.topCategory = lastC.curCategory;
		}
	}else{ 			
		lastC.topCategory = lastC.curCategory;
	}
	return lastC;
};