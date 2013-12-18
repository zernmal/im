global.getLibFile = function(filename){

		return require(__dirname+"/"+filename);
};
global.getModelFile = function(filename){
	return require(__dirname+"/../model/"+filename);
}
