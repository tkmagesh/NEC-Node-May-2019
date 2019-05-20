var taskDb = require('./taskDb'),
	uuid = require('uuid/v4');

function getAll(callback){
	return taskDb.getData(); //returns a promise
}

async function addNew(newTaskData){
	var taskList = await getAll();
	if (newTaskData.id === 0)
		newTaskData.id = uuid();
	taskList.push(newTaskData);
	await taskDb.saveData(taskList);
	return newTaskData;
}

var taskService = {
	getAll,
	addNew	
};

module.exports = taskService;
