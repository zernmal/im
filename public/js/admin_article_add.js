//栏目选项卡里面的栏目层级始化,在后台很多页面会用到
var categories = {},
	optStr = "",
	$categories = $("#categories"),
	selectVal = $categories.val(),
	setCategoryLevel = function(pid,level){
		var spaceStr = "",
			selectedStr = "";
		for(var k = 0 ; k < level ; k++){
			spaceStr = spaceStr+"----";
		}
		for(var i in categories){
			if(selectVal==i){
				selectedStr = ' selected="selected" ';
			}else{
				selectedStr = "";
			}
			if(categories[i].pid==pid){
				optStr += '<option '+selectedStr+' value="'+i+'">'+spaceStr+categories[i].name+'</option>'
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
$categories.html(optStr);