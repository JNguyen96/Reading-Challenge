var express = require('express');
var router = express.Router();

/*
 * GET home page
 */
router.get('/home', function(req,res){
	res.render('home', {locals:{title: 'A2F Winter Reading Callenge', users : 2});
});

module.exports = router;
