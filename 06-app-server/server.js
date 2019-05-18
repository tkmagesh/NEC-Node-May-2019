var http = require('http'),
	url = require('url'),
	querystring = require('querystring'),
	calculator= require('./calculator');

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	if (req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query),
			op = queryData.op,
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			result = calculator[op](x,y);

		res.write(result.toString());
		res.end();
	} else if (req.method === 'POST'){
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
		}); 
	} else {
		res.statusCode = 404;
		res.end();
	}

});

server.listen(8085);

server.on('listening', function(){
	console.log('app server listening on 8085');
});