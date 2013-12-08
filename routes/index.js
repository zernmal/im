
/*
 * GET home page.
 */
var controller = null,
	path = '',
	pathLenght = 0,
	fs = require('fs'),
  thePath = require("path");  
 
module.exports = function(app) {  
  	app.get(/^\/(.*)/i, function(req, res){
  		//req.params
    	
      path = req.params[0];
  		
  		var indexPage = function(rq,rs){
        //显示首页，由于req可能被处理过，所以在这里不直接使用上级作用域的req
        res.render('index', { title: 'Express' }); 
      },
      go404 = function(rq,rs){
         res.render('404page', { title: '404page' }); 
      };


      //静态文件直接过滤（这里必须直接在nigx或者apache等服务器上直接做转发）
  		if(path.match(/\.js|\.css|\.png|\.jpg|\.doc|\.pdf|\.xls|\.woff|\.tff|\.svg/i)){        

        //此处限制了当前的JS所在的目录文件必须是跟静态文件目录同一级的
  			var filepath = thePath.resolve(__dirname + '/../'+path);
        if (fs.existsSync(filepath)) {
  				fs.createReadStream(filepath).pipe(res);
          return;			
  			}else{
          go404(req,res);
        }  			
  		}

      

  		


      //在这里之后需要判断系统是否开启了栏目的自定义静态路径来路径，如：用/about访问关于我们

    	
    	if(path[path.length-1]=="/"){
    		path = path.substring(0,path.length-1);    		
    	}
    	path = path.split("/");
    	//console.log(path[path.length-1]);	
    	if((/^[\d]*$/).test(path[path.length-1])){
    		req.query["id"]=path.pop();    		
    	}
    	pathLenght = path.length;
    	if(pathLenght==0 || (pathLenght==1 && path[0]=="index")){
    		//首页
    		indexPage(req,res);   		
    	}else if(pathLenght==1){

      var filepath = thePath.resolve(__dirname+'/'+path[0]+".js");
			fs.open(filepath,"r",function (err,fd) {
  				if(!err){
					controller = require("./"+path[0]);
					if(typeof controller.index == "function"){
	  					controller.index(req,res);
		  			}else{
	  					go404(req,res);
		  			}					
  				}else{
  					go404(req,res);
  				}		  				
  			});		

    	}else{
    		var tempPath = path.join("/");
        var filepath = thePath.resolve(__dirname+'/'+tempPath+".js");
    		fs.open(filepath,"r",function (err,fd) {
  			  	if(err){
  			  		//不存在该文件，则把最后一个路径当成倒数第二个路径的模块的方法
  			  		var tempMethod = path.pop();
  			  		tempPath = path.join("/");
              var filepath = thePath.resolve(__dirname+'/'+tempPath+".js");
		  			fs.open(filepath,"r",function (err,fd) {
		  				if(!err){
	  						controller = require("./"+tempPath);		  					
		  					if(typeof controller[tempMethod] == "function"){
			  					controller[tempMethod](req,res);
				  			}else{
			  					go404(req,res);
				  			}
		  				}else{
		  					go404(req,res);
		  				}		  				
		  			});		  			
  			  	}else{
  			  		//存在，则调用最后一个路径的index方法
            var filepath = thePath.resolve(__dirname+'/'+tempPath+".js");
		  			fs.open(filepath,"r",function (err,fd) {
		  				if(!err){	  						
				  			controller = require("./"+tempPath);
				  			if(typeof controller.index == "function"){
			  					controller.index(req,res);
				  			}else{
			  					go404(req,res);
				  			}				  			
		  				}else{
		  					go404(req,res);
		  				}		  				
		  			});
  			  	}
			});		
    	}
	});
};