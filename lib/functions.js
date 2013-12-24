global.getLibFile = function(filename){

		return require(__dirname+"/"+filename);
};
global.getModelFile = function(filename){
	return require(__dirname+"/../model/"+filename);
};
global.getActionFile = function(filename){
	return require(__dirname+"/../routes/"+filename);
};
global.getDatetime = function(time){//将javascript getTime出来的时间变成datetime格式
	return time;
};
