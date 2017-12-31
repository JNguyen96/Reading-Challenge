var express = require('express');
var router = express.Router();

/*
 * GET Profile page
 */
router.get('/', function(req,res){
	res.render('profile', { title: 'User Profile' });
});

/*
 * POST New book to booklist
 */
router.post('/addBook/:id', function(req, res){
	var db = req.db;
	var collection = db.get('userlist');
	var user = req.params.id;
	for(var num_users = 0; num_users < collection.length; num_users++){
		if(collection[num_users]._id == user){
			collection[num_users].books.push(req.body);
			break;
		}
	}
});

module.exports = router;