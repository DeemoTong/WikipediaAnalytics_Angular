let mongoose = require('mongoose'),
    dataBaseConfig = require('../database/db'),
    Schema = mongoose.Schema,
    fs = require('fs');

var admin = fs.readFileSync('../../src/dataset/administrators.txt').toString().split("\n");
var bot = fs.readFileSync('../../src/dataset/bots.txt').toString().split("\n");
var adminAndBot = admin.concat(bot);

mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// var revSchema = new Schema(
// 		{title: String, 
// 		 timestamp:String, 
// 		 user:String, 
// 		 anon:String,
//          type:String},
// 		 {
// 			    versionKey: false 
//     })
// var Revision = mongoose.model('Revision', revSchema, 'revisions')
    
let RevisionSchema = new Schema({
  revid: {
    type: Number
  },
  parentid: {
    type: Number
  },
  minor: {
    type: Boolean
  },
  anon: {
    type: Boolean
  },
  userid: {
    type: Number
  },
  timestamp: {
    type: String
  },
  size: {
    type: Number
  },
  sha1: {
    type: String
  },
  parsedcomment: {
    type: String
  },
  title: {
    type: String
  },
  type: {
      String
  }
}, {
  collection: 'revisions'
})

var Revision = mongoose.model('Revision', RevisionSchema)

//update anon with type - anon
Revision.updateMany(
    {'anon':{$exists:true}},
    {$set:{type:'anonymous'}},
    function(err,result){
		if (err){
			console.log("Update error!")
		}else{
            console.log('anonymous updated:');
			console.log(result);
		}})

//update admin with type - admin
Revision.updateMany(
    { $and:[{user:{'$in': admin, $exists: true}},{anon:{$exists:false}}] },
    {$set:{type:'admin'}},
    function(err,result){
		if (err){
			console.log("admin Update error!")
		}else{
            console.log('admin updated:');
			console.log(result);           
	}})

//update bot with type - bots
Revision.updateMany(
    { $and:[{user:{'$in': bot, $exists: true}},{anon:{$exists:false}}] },
    { $set:{type:"bot"}},
    function(err,result){
        if (err){
            console.log(" bot Update error!")
        }else{
            console.log('bot updated:');
            console.log(result);
    }})
    
//update regular user with type - regular
Revision.updateMany(
    { $and:[{user:{'$nin': adminAndBot, $exists: true}},{anon:{$exists:false}}] },
    { $set:{type:"regular"}},
    function(err,result){
		if (err){
			console.log("regular Update error!")
		}else{
			console.log('regular updated:');
            console.log(result);
		}})

//update no user with type - no
// Revision.updateMany(
//     {'user': {$exists: false}},
// 	  {$set:{type:'no'}},{multi: true, upsert:true},
//     function(err,result){
// 		if (err){
// 			console.log("Update error!")
// 		}else{
// 			console.log('no user updated:');
//             console.log(result);
//     }})
