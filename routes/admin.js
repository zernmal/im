
/*
 * GET admin page.
 */
 
module.exports.index = function(req, res){
	res.render('admin/index', { title: 'admin_index' });
};

module.exports.system = function(req, res){
	res.render('admin/system', { title: 'admin_system' });
};