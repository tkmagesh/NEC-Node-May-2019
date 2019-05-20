var fs = require('fs'),
	path = require('path');

var dataFile = path.join(__dirname, '../data/taskData.json');

function getData(){
	var p = new Promise(function(resolveFn, rejectFn){
		fs.readFile(dataFile, {encoding : 'utf8'}, function(err, rawData){
			if (err){
				return rejectFn(err);
			}
			var result = JSON.parse(rawData);
			resolveFn(result);
		});	
	})
	return p;
}

function saveData(data){
	var p = new Promise(function(resolveFn, rejectFn){
		fs.writeFile(dataFile, JSON.stringify(data), function(err){
			if (err){
				return rejectFn(err);
			}
			resolveFn();
		});
	});
}

module.exports = {
	getData,
	saveData
};

