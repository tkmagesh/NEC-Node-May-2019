var taskDb = require('./taskDb');

var taskService = {
	getAll(){
		return taskDb.getData();
	}
};

module.exports = taskService;
