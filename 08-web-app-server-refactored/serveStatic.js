var path = require('path'),
	fs = require('fs');


var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.xml', '.json', '.ico'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(req, res){
	var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	}
}