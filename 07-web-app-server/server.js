/*
	Assignment:
		refactor the code in to the following modules and modify server.js to use these modules
		
	dataParser.js
	serveStatic.js
	serveCalculator.js
	notFoundHandler.js
*/


var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.xml', '.json', '.ico'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

var server = http.createServer(function(req, res,){
	var urlObj = url.parse(req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	var resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (req.method === 'GET' && urlObj.pathname === '/calculator'){
		var queryData = querystring.parse(urlObj.query),
			op = queryData.op,
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			result = calculator[op](x,y);

		res.write(result.toString());
		res.end();
	} else if (req.method === 'POST' && urlObj.pathname === '/calculator'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawData),
				op = bodyData.op,
				x = parseInt(bodyData.x),
				y = parseInt(bodyData.y),
				result = calculator[op](x,y);

			res.write(result.toString());
			res.end();
		})
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080');	
});
