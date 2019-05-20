var chalk = require('chalk');

module.exports = function(req, res, next){
	var startTime = new Date();
	var logMessage = chalk.red(req.method) + '\t' + chalk.blue(req.urlObj.pathname);
	
	res.on('finish', function(){
		logMessage += '\t' + chalk.green(res.statusCode);
		var endTime = new Date(),
			elapsed = endTime - startTime;
		logMessage += '\t' + chalk.magenta(elapsed) + 'ms';
		console.log(logMessage);
	});
	next();
}