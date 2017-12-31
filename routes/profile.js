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
router.post('/')

module.exports = router;