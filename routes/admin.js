
/*
 * GET admin page.
 */
 var User = getModelFile("user"),
 	userModel = new User(),
 	crypto = require("crypto");

module.exports.index = function(req, res){
	res.render('admin/index', { title: 'admin_index' });
};

module.exports.logout = function(req,res){
	req.session.userid = 0;
	req.session.isAdmin = 0;
	res.render("notic",{msg:"退出成功",gourl:"/admin/login"});
};

module.exports.login = function(req,res){
	var redirectUrl = req.query.redirecturl || "/admin";
	if(req.session.userid&&req.session.isAdmin){
		res.redirect("/admin");
	}else if(req.cookies.userid&&!req.cookies.isAdmin){
		res.render('notic', {msg:"没有权限",gourl:"/"});		
	}else{	
		res.render('admin/login', {title:"后台登录",redirectUrl:redirectUrl , errMsg : ""});
	}
};



module.exports.loginp = function(req,res){

	var email = req.body.email,
		password = req.body.password,
		redirecturl = req.body.redirecturl || "/admin";

	
	if(!email||!password){
		res.render("notic",{msg:"邮箱或密码不能为空",gourl:"/admin/login"});
		return;
	}
	password = crypto.createHash('md5').update(password).digest('hex');

	userModel.checkLogin(email,password,function(user){		
		if(user){
				console.log(user);
			userModel.isAdmin(user.userid,function(isAdmin){
				if(isAdmin){
					/*res.cookie(userid ,user.userid);
					res.cookie(isAdmin ,isAdmin);*/
					req.session.userid = user.userid;
					req.session.isAdmin = true;
					res.render("notic",{msg:"登录成功",gourl:redirecturl});
				}else{
					res.render("notic",{msg:"没有权限",gourl:"/"});					
				}
			});
		}else{
			res.render("notic",{msg:"邮箱或密码错误",gourl:"/admin/login"});
		}
	});
};