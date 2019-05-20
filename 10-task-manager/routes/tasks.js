var express = require('express'),
	router = express.Router();

var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Bangalore', isCompleted : true},
	{id : 3, name : 'Master Node.js', isCompleted : false},
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

module.exports = router;