module.exports.index = function(req, res){
	var System = require(__dirname+"/../../model/system"),
		systemModel = new System(),
		siteInfo = systemModel.getSiteInfo();
	res.render('admin/system/index', { title: '系统基本参数配置',siteInfo : siteInfo });
};