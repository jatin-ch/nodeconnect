var router = require('express').Router();
var Category = require('../models/category');
var Story = require('../models/story');

function paginate(req, res, next){
  var perPage = 3;
  var page = req.params.page;

  Story
       .find()
       .skip(perPage*page)
       .limit(perPage)
       .populate('category')
       .exec(function(err, stories){
         if(err) return next(err);
         Story.count().exec(function(err, count){
           if(err) return next(err);
           res.render('story/show', { stories: stories, pages: count/perPage });
         });
       });
}

Story.createMapping(function(err, mapping){
  if(err){
    console.log("error creating mapping");
  } else{
    console.log("Mapping created");
    console.log(mapping);
  }
});

var stream = Story.synchronize();
var count = 0;
stream.on('data', function(){
  count++;
})
stream.on('close', function(){
  console.log("Indexed " + count + " documents");
});
stream.on('error', function(err){
  console.log(err);
});


router.post('/search', function(req, res, next){
  res.redirect('/search?q=' + req.body.q);
});

router.get('/search', function(req, res, next){
  if(req.query.q){
    Story.search({
      query_string: { query: req.query.q }
    }, function(err, results){
      results:
      if(err) return next(err);
      var data = results.hits.hits.map(function(hit){
        return hit;
      });
      res.render('story/search-result', {
        query: req.query.q,
        data: data
      });
    });
  }
});


router.get('/story/show', function(req, res, next){
  paginate(req, res, next);
});
router.get('/story/show/:page', function(req, res, next){
  paginate(req, res, next);
});

router.get('/stories', function(req, res, next){
  Category.find({}, function(err, categories){
    if(err) return next(err);
      res.render('story/stories', { categories: categories });
  });
});

router.get('/stories/:id', function(req, res, next){
  Story
  .find({ category: req.params.id })
  .populate('category')
  .exec(function(err, stories){
    if(err) return next(err);
    res.render('story/index', { stories: stories });
    //res.json(stories);
  });
});

router.get('/story/:id', function(req, res, next){
  Story.findById({ _id: req.params.id }, function(err, story){
    if(err) return next(err);
    res.render('story/single', { story: story});
  });
});

module.exports = router;
