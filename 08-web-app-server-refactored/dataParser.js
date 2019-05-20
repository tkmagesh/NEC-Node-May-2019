var url = require('url');

module.exports = function(req, res, next){
	console.log('[@dataParser] - parsing the req.url');
	var urlObj = url.parse(req.url);
	req['urlObj'] = urlObj;
	next();
}