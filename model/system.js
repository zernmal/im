var System = function(){
	var _configFileHandle = "no",
		_that = this;	
	
	_that.getConfig = function(){
		/*var fs = require("fs"),
			data = fs.readFileSync(__dirname+'/../config.js');
		return JSON.parse(data);*/
		return require(__dirname+'/../config.js');
	};

	_that.updateConfig = function(newConfig){
		console.log("update config");
	};

};

module.exports = System;