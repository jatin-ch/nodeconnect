var router = require('express').Router();



router.get('/', function(req, res){
  res.render('pages/home');
});

router.get('/home', function(req, res){
  var page = "Home";
  res.json("Hello World! this is the " + page + " page.");
});


module.exports = router;
