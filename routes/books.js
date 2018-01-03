var express = require('express');
var router = express.Router();
var responses_x_questions = require('../reports/barChart.json');  
var clone = require('clone');

/* GET recommended books page. */
router.get('/recommendedbooks', function(req, res, next) {
  res.render('recbooks', { title: 'List of Recommended Books' });
});

/* GET books read page. */
router.get('/booksread', function(req, res, next) {
  res.render('booksread', { title: 'Books Read' });
});

module.exports = router;