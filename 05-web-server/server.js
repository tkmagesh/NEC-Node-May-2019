var http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs');

var server = http.createServer(function(req /* IncomingMessage (ReadableStream) */, res /* ServerResponse (WritableStream) */){
	var urlObj = url.parse(req.url);

	var resource = path.join(__dirname, urlObj.pathname);
	console.log(req.method + '\t' + urlObj.pathname);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}

	var readStream = fs.createReadStream(resource);

	readStream.pipe(res);

	readStream.on('error', function(err){
		res.statusCode = 500;
		res.end();
	});
	
});

server.listen(8080);

server.on('listening', function(){
	console.log('web server listening on 8080');
});