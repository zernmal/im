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
	var temp = new Date(time),
		padStr = function(i) {
		    return (i < 10) ? "0" + i : "" + i;
		},
		dateStr = padStr(temp.getFullYear()) + "-" +
                  padStr(1 + temp.getMonth()) + "-" +
                  padStr(temp.getDate()) + " " +
                  padStr(temp.getHours()) + ":" +
                  padStr(temp.getMinutes()) + ":" +
                  padStr(temp.getSeconds());
    return dateStr;
};
