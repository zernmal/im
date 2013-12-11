module.exports.index = function(req, res){
	var System = require(__dirname+"/../../model/system"),
		systemModel = new System(),
		config = systemModel.getConfig();
	res.render('admin/system/index', { title: '系统基本参数配置',siteInfo : config.siteInfo });
};