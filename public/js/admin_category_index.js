var trStr = '',
	$tr = $("#categorytbody>tr"),
	setCategoryLevel = function(pid,level){
		var spaceStr = "";
		for(var k = 0 ; k < level ; k++){
			spaceStr = spaceStr+"&nbsp;------&nbsp;";
		}
		
		var nStr = 0;
		$tr.each(function(){
			var $t = $(this);
			if($t.data("pid")==pid){
				$t.children(".name").prepend(spaceStr);
				trStr += '<tr>'+$t.html()+'</tr>';
				setCategoryLevel($t.data("categoryid"),level+1);
				nStr++;
			}
			
		});
	};
setCategoryLevel(0,0);
$("#categorytbody").html(trStr);