const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let User = new Schema({
  // firstname: String,
	// lastname: String,
	// email: String,
	// username: String,
	// password: String
	firstname: {
    type: String,
    required: true
	},
	lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'users'
})

// var User = mongoose.model('User', userSchema);
module.exports = mongoose.model('user', User)