var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/items/:categoryid', db.getItemsByCategory);
router.get('/item/:itemid', db.getItemByItemID);
router.get('/test', db.test);

module.exports = router;
