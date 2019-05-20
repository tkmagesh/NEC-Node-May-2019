var fs = require('fs'),
	path = require('path');

var dataFile = path.join(__dirname, '../data/taskData.json');

function getData(){
	var rawData = fs.readFileSync(dataFile, {encoding : 'utf8'});
	var result = JSON.parse(rawData);
	return result;
}

module.exports = {
	getData
};