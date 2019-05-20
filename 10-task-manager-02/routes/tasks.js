var express = require('express'),
	router = express.Router(),
	uuid = require('uuid/v4'),
	taskService = require('../services/taskService');

var taskList = [
	
];

router.get('/', async function(req, res, next){
	var taskList = await taskService.getAll();
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

router.post('/', async function(req, res, next){
	var newTaskData = req.body;
	var newTask = await taskService.addNew(newTaskData);
	res.status(201).json(newTask);
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