$("#categorytype").on("change",function(){
	var type = $(this).find("option:selected").text();  
	$("#listindext").val("templates/"+type+"/list_index.html");
	$("#listt").val("templates/"+type+"/list.html");
	$("#listbodyt").val("templates/"+type+"/list_body.html");
	$("#listimaget").val("templates/"+type+"/list_image.html");
});