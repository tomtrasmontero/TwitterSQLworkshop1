
var express = require('express');
var pg = require('pg');
var swig = require('swig');
var app = express();
var postgresUrl = 'postgres://localhost/twitterdb';
var client = require('./db');
var bodyParser = require('body-parser');
var path = require('path');
var func = require('./func');

swig.setDefaults({ cache:false });

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join( __dirname, 'node_modules')));


module.exports = app;

// home page
app.get('/', function(req, res) {
	client.connect(function (err , conn){
		if (err) throw err;

		conn.query('SELECT * from tweets join users on  users.id = tweets.userid', [] , function(err, results){
			if (err) {
				return res.send(err);
			}
			var tweets = results.rows;	
			// console.log(tweets);
			res.render('index', { title: 'Twitter FS', categories: tweets });
		});
	});
});

//routes to twitter
app.get('/tweets/:tweeterer', function(req, res) {
	client.connect(function (err , conn){
		if(err) {
			throw err;
		}
		conn.query('select * from tweets join users on tweets.userid = users.id where users.id = $1',[req.params.tweeterer],function(err,results){
			if(err) {
				return res.send(err);
			}
			var tweets = results.rows;
			console.log(tweets);
		res.render('tweets',{title: tweets, categories: tweets, name: tweets[0].name});
		});
	});
});

app.get('/tweets/usertweet/:content', function (req,res) {
	client.connect(function(err, conn){
		if(err) {
			throw err;
		}
		conn.query('select * from tweets join users on tweets.userid = users.id where tweets.content = $1', [req.params.content], function(err, results){
			if(err){
				return res.send(err);
			}
			var tweets = results.rows;
			console.log( tweets);
		res.render('tweets', {title: 'a Tweet', categories: tweets});
		});
	});
});

app.post('/tweets/tweetadd', function (req,res){

		var tweetContent = req.body.content;
		var tweeterer = req.body.author;
		func.addUsers(tweeterer, tweetContent, function(cb){
			if(cb){
				res.redirect('/');
			}
		});

});








