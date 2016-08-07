var client = require('./db');
var allUser;

module.exports = {
	getUsers: function(name, cb) {
		
		client.connect(function(err, conn){
			if (err) {
				throw err;
			}
			conn.query('select users.name, users.id from users where users.name = $1', [name] , function(err,results){
				if(err){
					throw(err);
				}				
				
				if(results.rows.length !== 1 ){
					cb (false);					
				}else{
					cb (true);	
				};				
			});

		});

	},

	addUsers: function(name,content,callback) {
		this.getUsers(name, function(cb){
			if(!cb){
				client.connect(function(err, conn){
					if(err) {
						throw err;
					}
				conn.query('insert into users (name) values ($1) returning users.id',[name],function(err, results){
					if(err){
						throw err;
					}
					var idOfUser = (results.rows[0].id);

					conn.query('insert into tweets (userid, content) values ($1,$2)', [idOfUser, content], function(err,results){
						if(err){
							throw err;
						}
					});
					callback(true);
				});
			
			});
			}else{
				client.connect(function(err, conn){
					if(err) {
						throw err;
					}

				conn.query('select * from users where users.name = $1',[name],function(err, results){
					if(err){
						throw err;
					}
					var idOfUser = (results.rows[0].id);
						conn.query('insert into tweets (userid, content) values ($1,$2)', [idOfUser, content], function(err,results){
							if(err){
								throw err;
							}
						});				
					callback(true);
					});
				});
			}

		});
	}
}