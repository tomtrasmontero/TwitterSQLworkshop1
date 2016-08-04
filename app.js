
var express = require('express');
var pg = require('pg');
var swig = require('swig');
var app = express();
var postgresUrl = 'postgres://localhost/twitterdb';
var client = require('./db');

swig.setDefaults({ cache:false });

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

module.exports = app;


app.get('/', function(req, res) {
	client.connect(function (err , conn){
		if (err) throw err;

		conn.query('SELECT * from tweets join users on tweets.userid = users.id', [] , function(err, results){
			if (err) {
				return res.send(err);
			}
			var tweets = results.rows;
			console.log(tweets);
			res.render('index', { title: 'Twitter FS', categories: tweets });
		});
	});
});

