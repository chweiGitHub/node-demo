// nodejs是基于common规范的

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  "id": {type:String},
  "name": String,
  "price":Number,
  "image":String
});

module.exports = mongoose.model('Product', productSchema);
