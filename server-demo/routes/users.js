var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//这个是需要通过/users/test才能访问的到。是二级路由
router.get('/test', function(req, res, next) {
  res.send('test');
});

module.exports = router;
