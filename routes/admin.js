
/*
 * GET admin page.
 */
 
module.exports.index = function(req, res){
	res.render('admin/index', { title: 'admin_index' });
};

