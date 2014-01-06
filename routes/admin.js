
/*
 * GET admin page.
 */
 var User = getModelFile("user"),
 	userModel = new User();

module.exports.index = function(req, res){
	res.render('admin/index', { title: 'admin_index' });
};

module.exports.loginp = function(req,res){

	var email = req.body.email,
		password = req.body.password,
		redirecturl = req.body.redirecturl || "/admin";

	if(email==""||password==""){
		res.render("notic",{msg:"邮箱不能为空",gourl:"/admin/login"});
		return;
	}

	userModel.checkLogin(email,password,function(user){
		if(user){
			userModel.isAdmin(user.userid,function(isAdmin){
				if(isAdmin){
					res.cookie(userid ,user.userid);
					res.cookie(isAdmin ,isAdmin);
					res.render("notic",{msg:"登录成功",gourl:redirecturl});
				}else{
					res.render("notic",{msg:"没有权限",gourl:"/admin/login"});					
				}
			});
		}else{
			res.render("notic",{msg:"邮箱或密码错误",gourl:"/admin/login"});
		}
	});
	res.render("notic",{msg:'登录成功',gourl:"/admin"});
};