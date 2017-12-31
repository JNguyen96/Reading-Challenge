var express = require('express');
var router = express.Router();

/*
 * GET home page
 */
router.get('/', function(req,res){
	res.render('home', {title: 'A2F Winter Reading Callenge'});
});

module.exports = router;
