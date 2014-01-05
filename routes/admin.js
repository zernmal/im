
/*
 * GET admin page.
 */
 
module.exports.index = function(req, res){
	res.render('admin/index', { title: 'admin_index' });
};

module.exports.loginp = function(req,res){	
	res.render("notic",{msg:'登录成功',gourl:"/admin"});
};