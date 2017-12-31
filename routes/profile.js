var express = require('express');
var router = express.Router();

/*
 * GET Profile page
 */
router.get('/profile', function(req,res){
	res.render('profile', { title: 'User Profile' });
});

/*
 * POST New book to booklist
 */
router.post('/addBook/:id', function(req, res){
	var db = req.db;
	var collection = db.get('userlist');
	var user = req.params.id;
	for each (userItem in collection){
		if(userItem.id == user){
			userItem.books.push(req.body);
			break;
		}
	}
});

module.exports = router;