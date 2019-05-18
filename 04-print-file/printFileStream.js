var fs = require('fs');

var readStream = fs.createReadStream('sample.txt', { encoding : 'utf8'}); //returns a readableStream
/*
	events => open, data, end, close, error 
*/

/*var readCount = 0;

readStream.on('data', function(chunk){
	++readCount;
	console.log(chunk);
});

readStream.on('end', function(){
	console.log('Thats all folks!');
	console.log('readCount = ', readCount);
});

readStream.on('error', function(e){
	console.log('something went wrong!!');
});*/

readStream.pipe(process.stdout);

var readCount = 0;

readStream.on('data', function(chunk){
	++readCount;
});

readStream.on('end', function(){
	console.log('Thats all folks!');
	console.log('readCount = ', readCount);
});

readStream.on('error', function(e){
	console.log('something went wrong!!');
});