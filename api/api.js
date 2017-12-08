var router = require('express').Router();
var async = require('async');
var faker = require('faker');
var Category = require('../models/category');
var Story = require('../models/story');


router.post('/search', function(req, res, next){
  console.log(req.body.search_term);
  Story.search({
    query_string: { query: req.body.search_term }
  }, function(err, results){
    if(err) return next(err);
    res.json(results);
  });
});


router.get('/:name', function(req, res, next){

  async.waterfall([
    function(callback){
      Category.findOne({ name: req.params.name }, function(err, category){
        if(err) return next(err);
        callback(null, category);
      });
    },

    function(category, callback){
      for(var i = 0; i < 10; i++){
        var story = new Story();
        story.category = category._id;
        story.headline = faker.lorem.sentence();
        story.body = faker.lorem.paragraph();
        story.image = faker.image.image();
        story.author = req.user._id;

        story.save();
      }
    }
  ]);
  res.json({ message: 'Success'});
});

module.exports = router;
