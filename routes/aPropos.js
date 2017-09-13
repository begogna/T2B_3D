var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('aPropos', { title: 'A propos' });
});

module.exports = router;
