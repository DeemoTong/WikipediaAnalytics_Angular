const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Article = new Schema({
  title: {
    type: String
  },
  revisions: {
    type : Array
  }
  // type: Array
}, {
  collection: 'articles'
})

module.exports = mongoose.model('article', Article)