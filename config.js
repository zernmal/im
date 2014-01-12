module.exports = { 
	siteInfo : {
		"sitename" : "im-corp",
		"keyword" : "the keyword of im-corp",
		"description" : "the description of im-corp",
		"domain" : "www.im-corp.com",
		"owner" : "owner",
		"email" : "service@im-corp.com",
		"phone" : "13433039485",
		"zip" : "510000",
		"address" : "广东省深圳市南山区",
		"icp" : "粤ICP1090909"
	},
	dbInfo : {
		"host" : "localhost",
		"dbname" : "im",
		"user" : "root",
		"passwd" : "",
		"port" : "3306"
	},
	redisInfo : {
		"host" : "127.0.0.1",
		"port" : ""
	},
	expires : {
	    fileMatch: /^(gif|png|jpg|js|css)$/ig,
	    maxAge: 60 * 60 * 24 * 365
	},
	compress : {
	    match: /css|js|html/ig
	}
}