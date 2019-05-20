module.exports = function(req, res, next){
	var startTime = new Date();
	var logMessage = req.method + '\t' + req.urlObj.pathname;
	
	res.on('finish', function(){
		logMessage += '\t' + res.statusCode;
		var endTime = new Date(),
			elapsed = endTime - startTime;
		logMessage += '\t' + elapsed + 'ms';
		console.log(logMessage);
	});
	next();
}