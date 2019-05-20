var express = require('express'),
	router = express.Router();

var taskList = [
	
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

router.get('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
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
})

module.exports = router;