var pg = require('pg');

var _db;

module.exports = {
	connect: function(cb){
		if(_db){
			return cb(null,_db);
		}
		var client = new pg.Client('postgres://localhost/twitterdb');
		client.connect(function(err){
			if(err){
				return cb(err, null);
			}
			_db = client;
			cb(null, _db);
		});
	}
};