
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

  cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
		cluster.fork();
  });
}else{

	var app = express();

	// all environments
	app.set('port', process.env.APP_PORT || 18080);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser({uploadDir:'./public/uploads/temp'}));
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.cookieSession({secret:"dianping"}));
	//app.use(express.session({secret:"dianping"}));
	app.use(app.router);
	
	//app.use(express.directory(path.join(__dirname, 'public')));
	//app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}


	http.createServer(app).listen(app.get('port'), function(){
	  //console.log('Express server listening on port ' + app.get('port'));
	});

	routes(app);
}