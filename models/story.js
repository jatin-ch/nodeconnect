var mongoose = require('mongoose');
var mongosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category'},
  headline: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true
});

StorySchema.plugin(mongosastic, {
  hosts: [
    'localhost:9200'
  ]
});


module.exports = mongoose.model('Story', StorySchema);
