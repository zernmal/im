var crypto = require("crypto");

module.exports.index = function(req, res ,methods){
	
	var str = req.query.str,
	str = crypto.createHash('md5').update(str).digest('hex');//以十六进制显示出MD5值
    res.send(str);
};

