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

module.exports = router;
