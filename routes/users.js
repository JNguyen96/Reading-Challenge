var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
	MongoClient.connect('mongodb://a2fRC:acts24247@ds139067.mlab.com:39067/heroku_f8dn17g6', (err, db) => {  
  		if (err) {
		    return console.log(err);
	  }

	  // Do something with db here, like inserting a record
		db.db('heroku_f8dn17g6').collection('userlist').find().toArray(function(err, docs) {
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
 	MongoClient.connect('mongodb://a2fRC:acts24247@ds139067.mlab.com:39067/heroku_f8dn17g6', (err, db) => {  
  		if (err) {
		    return console.log(err);
	  }
	 	db.db('heroku_f8dn17g6').collection('userlist').insert(body, function(err, result){
	 		res.send((err === null) ? {msg: ''} : {msg: err});
	 	});
	 	db.close()
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
	var userId = req.params.id;
	var body = req.body;
 	MongoClient.connect('mongodb://a2fRC:acts24247@ds139067.mlab.com:39067/heroku_f8dn17g6', (err, db) => {  
  		if (err) {
		    return console.log(err);
	  	}
		var database = db.db('heroku_f8dn17g6').collection('userlist');
		database.updateOne( { _id : ObjectId(userId) }, { $set : { 'books' : Object.keys(body)[0] } }, function( err, result){
			console.log('IN HERE');
			res.send((err === null) ? {msg : ''} : {msg : err});
		});
		db.close();
 	});
});

module.exports = router;
