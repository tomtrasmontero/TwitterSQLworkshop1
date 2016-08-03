client.query('SELECT * FROM tweets', function (err, result) {
  if (err) return next(err); // pass errors to Express
  var tweets = result.rows;
  res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
});