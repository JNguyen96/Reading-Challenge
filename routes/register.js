var express = require('express');
var router = express.Router();

/* GET Register page. */
router.get('/', function(req,res){
	res.render('register', { title: 'Create an Account'});
});

/* POST to registeruser */
router.post('/registeruser', function(req,res){
	var db = req.db;
	var collection = db.collection('userlist');
	collection.insert(req.body, function(err, result){
		res.send((err === null) ? {msg: ''} : {msg: err});
	});
});

module.exports = router;