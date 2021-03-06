var System = function(){
	var _configFileHandle = "no",
		_that = this;	
	
	_that.getSiteInfo = function(){
		/*var fs = require("fs"),
			data = fs.readFileSync(__dirname+'/../config.js');
		return JSON.parse(data);*/
		return require(__dirname+'/../config.js').siteInfo;
	};

	_that.updateSiteInfo = function(siteInfo){
		console.log("update siteInfo");
	};

	_that.getDbInfo =  function(){
		return require(__dirname+'/../config.js').dbInfo;
	};

};

module.exports = System;