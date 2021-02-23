const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
//monggose

var admin = fs.readFileSync('../src/dataset/administrators.txt').toString().split("\n");
var bot = fs.readFileSync('../src/dataset/bots.txt').toString().split("\n");
var adminAndBot = admin.concat(bot);

// Define collection and schema
let Revision = new Schema({
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

Revision.statics.userNumber = function(userOrder, callback) {
  console.log("Revision - userNumber " + userOrder)

  return this.aggregate([{
          $match: {
              'anon': {
                  $exists: false
              },
              'user': {
                  '$nin': admin
              }
          }
      },
      {
          $group: {
              _id: {
                  title: "$title",
                  user: "$user"
              }
          }
      },
      {
          $group: {
              _id: "$_id.title",
              total: {
                  $sum: 1
              }
          }
      },
      {
          $sort: {
            total: userOrder
          }
      },
    //   {
    //       $limit: 5
    //   }
  ]).exec(callback);
};

Revision.statics.history = function (hisOrder, callback) {
  console.log("Revision - History " + hisOrder)

  return this.aggregate([{
          $group: {
              _id: "$title",
              start: {
                "$min": "$timestamp"
              },
              latest: {
                "$max": "$timestamp"
              }
          }
      
    },
    // {$project: {
    //     duration: {$divide: [{$subtract: ["$latest", "$start"]}, 3600000]}
    // }},
    //   {
    //       $sort: {
    //         duration: hisOrder
    //       }
    //   },
    //   {
    //       $limit: 1
    //   }
  ]).exec(callback);
};

Revision.statics.getTopUsersFromTitleUserNum = function (selectTitleName, num, callback) {
  return this.aggregate([{
          $match: {
              'title': selectTitleName,
            //   timestamp: {
            //     $gt: "2016-01-01T00:00:00Z",
            //     $lt: "2020-03-22T21:00:00Z"
            // }
          }
      },
      {
          $group: {
              _id: "$user",
              total: {
                  $sum: 1
              }
          }
      },
      {
          $sort: {
              total: -1
          }
      },
      {
          $limit: Number(num)
      }
  ]).exec(callback)
}

Revision.statics.getTopUserFromTitle = function (selectedTitle, callback) {

  return this.aggregate([{
          $match: {
              title: selectedTitle
          }
      },
      {
          $group: {
              _id: "$user",
              total: {
                  $sum: 1
              }
          }
      },
      {
          $sort: {
              total: -1
          }
      },
      {
          $limit: Number(5)
      }
  ]).exec(callback)
}

Revision.statics.getArticlesTotalRevNum = function (callback) {
  return this.aggregate([{
          $group: {
              _id: "$title",
              total: {
                  $sum: 1
              }
          }
      },
      {
          $sort: {
              total: -1
          }
      }
  ]).exec(callback)
}

Revision.statics.getArticleUserNumDesc = function(num, callback) {
  return this.aggregate([
      {
          $group: {
              _id: "$title",
              numOfUsers: {
                $sum: 1
              }
          }
      },
      {
          $sort: {
            numOfUsers: -1
          }
      },
      {
          $limit: Number(num)
      }
  ]).exec(callback)
}

Revision.statics.getArticleUserNumAsc = function(num, callback) {
    return this.aggregate([
        {
            $group: {
                _id: "$title",
                numOfUsers: {
                  $sum: 1
                }
            }
        },
        {
            $sort: {
              numOfUsers: 1
            }
        },
        {
            $limit: Number(num)
        }
    ]).exec(callback)
  }

Revision.statics.getTotalAuthorsName = function (callback) {
  return this.distinct("user").exec(callback)
}

Revision.statics.getArticlesByAuthor = function(selectedAuthor, callback) {
    return this.aggregate([{
        $match: {
            user: selectedAuthor
        }
    },
    {
        $group: {
            _id: "$title",
            total: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            total: -1
        }
    }
]).exec(callback)
}

Revision.statics.getRevisionsByAuthorAndTitle = function (selectedAuthor, selectedTitle, callback) {
    return this.find({
        user: selectedAuthor,
        title: selectedTitle
    }, {
        "timestamp": 1,
        "revid": 1
    }).sort({
        "timestamp": -1
    }).exec(callback)
}

Revision.statics.getAuthorRevisions = function (callback) {
    return this.aggregate([
    {
        $group: {
            _id: "$user",
            total: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            total: -1
        }
    }
    ]).exec(callback)
}


Revision.statics.overallBarChart = function (callback) {
    return this.aggregate([{
            $project: {
                year: {
                    $substr: ["$timestamp", 0, 4]
                },
                type: "$type"
            }
        },
        {
            $group: {
                _id: {
                    year: "$year",
                    type: "$type"
                },
                number: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                type: "$_id.type",
                number: "$number"
            }
        },
        {
            $sort: {
                "year": 1
            }
        },
    ]).exec(callback)
}

// Pie Chart
Revision.statics.overallPieChart = function (callback) {
    return this.aggregate([{
            $group: {
                _id: "$type",
                number: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                type: "$_id",
                number: "$number"
            }
        },
    ]).exec(callback)
}


module.exports = mongoose.model('Revision', Revision)