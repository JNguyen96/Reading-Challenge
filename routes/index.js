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

/*
 * GET home page
 */
router.get('/home', function(req,res){
	// var db = req.db
	// var collection = db.get('userlist');
	// var docs = collection.find({});
	// var keys = 'hello ';
	// for(key in docs){
	// 	keys += key.username + ' ';
	// }
	// var chartOptions = clone(responses_x_questions);

	// var categories = ["newCat1","newCat2","newCat3","newCat4","newCat5"];

	// chartOptions.xAxis[0].data = categories;
	// chartOptions.series[0].data = [10,20,30,40,50];

	// res.render('home', { title: 'Express', data: JSON.stringify(chartOptions), userlist : collection });
	res.render('home', { title: 'A2F Winter Reading Callenge', numUsers : 2});
});

module.exports = router;