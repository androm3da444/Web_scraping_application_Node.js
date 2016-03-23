var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', ItemSchema);