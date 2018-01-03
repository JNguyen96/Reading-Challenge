var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
	var db = req.db
	var collection = db.get('userlist');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});

/*
 * POST to registeruser
 */
 router.post('/registeruser', function(req,res){
 	var db = req.db;
 	var collection = db.get('userlist');
 	collection.insert(req.body, function(err, result){
 		res.send((err === null) ? {msg: ''} : {msg: err});
 	});
 });

/*
 * GET Profile page
 */
router.get('/profile/:id', function(req,res){
	res.render('profile', { title: 'User Profile', id: req.params.id });
});

/*
 * PUT New book to booklist
 */
router.put('/profile/addbook/:id', function(req, res){
	var db = req.db;
	var collection = db.get('userlist');
	var user = req.params.id;
	collection.update({ '_id' : user },{$set:{ 'books' : Object.keys(req.body)[0] }}, function(err, result){
		res.send((err === null) ? {msg: ''} : {msg: err});
	});
});

module.exports = router;
