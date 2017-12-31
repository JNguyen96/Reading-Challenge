 var express = require('express');
var router = express.Router();

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
	res.render('home', { title: 'A2F Winter Reading Callenge', numUsers : 2});
});

module.exports = router;