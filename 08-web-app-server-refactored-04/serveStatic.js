var path = require('path'),
	fs = require('fs');


var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.xml', '.json', '.ico'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function (staticResourcePath){
	return function(req, res, next){
		var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
		var resourcePath = path.join(staticResourcePath, resourceName);
		if (!isStatic(resourceName) || !fs.existsSync(resourcePath)){
			return next();
		}
		var stream = fs.createReadStream(resourcePath).pipe(res);
		stream.on('end', function(){
			next();
		});
	};
}