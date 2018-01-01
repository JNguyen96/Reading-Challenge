var express = require('express');
var router = express.Router();

/*
 * GET home page
 */
router.get('/:id', function(req,res){
	res.render('home', {title: 'A2F Winter Reading Callenge', id: req.params.id});
});

module.exports = router;