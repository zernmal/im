//选择完栏目类型后相应更改模板目录
$("#categorytype").on("change",function(){
	var type = $(this).find("option:selected").text();  
	$("#listindext").val("templates/"+type+"/list_index.html");
	$("#listt").val("templates/"+type+"/list.html");
	$("#listbodyt").val("templates/"+type+"/list_body.html");
	$("#listimaget").val("templates/"+type+"/list_image.html");
});

//栏目选项卡里面的栏目层级始化,在后台很多页面会用到
var categories = {},
	optStr = "",
	setCategoryLevel = function(pid,level){
		var spaceStr = "";
		for(var k = 0 ; k < level ; k++){
			spaceStr = spaceStr+"----";
		}
		for(var i in categories){
			if(categories[i].pid==pid){
				optStr += '<option value="'+i+'">'+spaceStr+categories[i].name+'</option>'
				setCategoryLevel(i,level+1);
			}
		}
	};
$("#categories>option").each(function(){
	categories[$(this).val()] = {
		name : $(this).text(),
		pid : $(this).data("pid")
	}	
});
setCategoryLevel(0,0);
$("#categories").html('<option value="0">作为顶级栏目</option>'+optStr);