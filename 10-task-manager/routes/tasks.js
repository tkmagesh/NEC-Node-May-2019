var express = require('express'),
	router = express.Router(),
	uuid = require('uuid/v4');

var taskList = [
	
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

router.get('/:id', function(req, res, next){
	var taskId = req.params.id;
	var result = taskList.find(function(task){
		return task.id === taskId;
	});
	if (!result){
		res.status(404).end();
	} else {
		res.json(result);
	}
});

router.post('/', function(req, res, next){
	//incoming data = { id : 0, name : '<task name>', isCompleted : false};
	//req.body will have the incoming data
	//generate new id and assign if id === 0
	//add the item to the array
	//return 201 status with the newly created task data
	var newTaskData = req.body;
	if (newTaskData.id === 0)
		newTaskData.id = uuid();
	taskList.push(newTaskData);
	res.status(201).json(newTaskData);
});

router.put('/:id', function(req, res, next){
	var taskId = req.params.id,
		updatedTask = req.body;

	var result = taskList.find(function(task){
		return task.id === taskId;
	});
	if (!result){
		res.status(404).end();
	} else {
		taskList = taskList.map(function(task){
			return task.id === taskId ? updatedTask : task;
		});
		res.status(200).json(updatedTask);
	}
});

router.delete('/:id', function(req, res, next){
	var taskId = req.params.id;
	var result = taskList.find(function(task){
		return task.id === taskId;
	});
	if (!result){
		res.status(404).end();
	} else {
		taskList = taskList.filter(function(task){
			return task.id !== taskId
		});
		res.status(200).end();
	}
});

module.exports = router;