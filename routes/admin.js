
/*
 * GET admin page.
 */
 
module.exports.index = function(req, res){
	res.render('admin/index', { title: 'admin_index' });
};

module.exports.loginp = function(req,res){
	req.session.userid = 1	;
	res.render("notic",{msg:'登录成功',gourl:"/admin"});
};