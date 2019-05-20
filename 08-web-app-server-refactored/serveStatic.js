var path = require('path'),
	fs = require('fs');


var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.xml', '.json', '.ico'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(req, res, next){

	var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
	if (isStatic(resourceName)){
		console.log('[@serveStatic] - start processing the request');
		var resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return next();
		}
		//fs.createReadStream(resourcePath).pipe(res);
		var stream = fs.createReadStream(resourcePath);

		stream.on('data', function(chunk){
			console.log('[@serveStatic] - serving chunk to res');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('[@serveStatic] - res.end()');
			res.end();
			next();
		});

		//sync
		/*var fileContents = fs.readFileSync(resourcePath);
		res.write(fileContents);
		res.end();*/
	} else {
		next();
	}
}