var router = require('express').Router();
var Post = require('../models/post');
var Purifier = require('html-purify');
var date = require('date-and-time');
var multer = require('multer');


router.get('/', function(req, res, next){
  Post.find({})
      .populate('author')
      .exec(function(err, posts){
        if(err) return next(err);
        res.render('posts/index', { message: req.flash('success'), posts: posts, date: date });
      });
});

router.post('/', function(req, res, next){
  var post = new Post();
  post.title = req.body.title;
  var purifier = new Purifier();
  post.body = purifier.purify(req.body.body);
  post.author = req.user;

  if(req.file){
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
      post.image = file.fieldname + "_" + Date.now() + "_" + file.originalname;
      path.join(__dirname, '/uploads/'+ post.image);
    }
  }

  post.save(function(err){
    if(err) return next(err);
    req.flash('success', 'Successfully added a post');
    return res.redirect('/posts');
  });
});

router.post('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post){
    if(err) return next(err);
    post.title = req.body.title;
    var purifier = new Purifier();
    post.body = purifier.purify(req.body.body);
    post.save(function(err){
      if(err) return next(err);
      req.flash('success', 'Post was saved successfully');
      return res.redirect('/posts');
    });
  });
});

router.post('/delete/:id', function(req, res, next){
  Post.remove({_id: req.params.id}, function(err){
    if(err) return next(err);
    req.flash('success', 'Post was deleted');
    return res.redirect('/posts');
  })
})

module.exports = router;
