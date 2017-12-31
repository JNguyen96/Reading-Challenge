var express = require('express');
var router = express.Router();

/*
 * GET Profile page
 */
router.get('/:id', function(req,res){
	res.render('profile', { title: 'User Profile', id: req.params.id });
});

/*
 * PUT New book to booklist
 */
router.put('/addBook/:id', function(req, res){
	var db = req.db;
	var collection = db.get('userlist');
	var user = req.params.id;
	collection.update({ '_id' : user },{$set:{ 'books' : Object.keys(req.body)[0] }}, function(err, result){
		res.send((err === null) ? {msg: ''} : {msg: err});
	});
});

module.exports = router;