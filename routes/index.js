var express = require('express');
var router = express.Router();
var responses_x_questions = require('../reports/barChart.json');  
var clone = require('clone');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'A2F Winter Reading Challenge' });
});

/* GET Register page. */
router.get('/register', function(req,res){
	res.render('register', { title: 'Create an Account'});
});

module.exports = router;