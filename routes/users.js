var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
	MongoClient.connect('mongodb://a2fRC:acts24247@ds135747.mlab.com:35747/a2f-reading-challenge', (err, db) => {  
  		if (err) {
		    return console.log(err);
	  }

	  // Do something with db here, like inserting a record
		db.collection('userlist').find().toArray(function(err, docs) {
        	res.json(docs);
      });
	  	db.close();
	});

});

/* GET Register page. */
router.get('/register', function(req,res,next){
	res.render('register', { title: 'Create an Account'});
});

/*
 * POST to registeruser
 */
 router.post('/registeruser', function(req,res,next){
 	var body = req.body;
 	MongoClient.connect('mongodb://a2fRC:acts24247@ds135747.mlab.com:35747/a2f-reading-challenge', (err, db) => {  
  		if (err) {
		    return console.log(err);
	  }
	 	req.db.collection('userlist').insert(body, function(err, result){
	 		res.send((err === null) ? {msg: ''} : {msg: err});
	 	});
 	});
 });

/*
 * GET Profile page
 */
router.get('/profile/:id', function(req,res,next){
	res.render('profile', { title: 'User Profile', id: req.params.id });
});

/*
 * PUT New book to booklist
 */
router.put('/profile/addBook/:id', function(req,res,next){
	var user = req.params.id;
	var body = req.body;
 	MongoClient.connect('mongodb://a2fRC:acts24247@ds135747.mlab.com:35747/a2f-reading-challenge', (err, db) => {  
  		if (err) {
		    return console.log(err);
	  	}
 		db.collection('userlist').update({ '_id' : user },{$set:{ 'books' : Object.keys(body)[0] }}, function(err, result){
			res.send((err === null) ? {msg: ''} : {msg: err});
		});
 	});
});

module.exports = router;
