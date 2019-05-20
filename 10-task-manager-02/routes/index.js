var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus architecto harum maiores, eum aperiam fugiat, numquam ratione quibusdam error perspiciatis accusantium ab, sequi vitae modi reiciendis voluptatem laboriosam nostrum autem.' });
});

module.exports = router;
