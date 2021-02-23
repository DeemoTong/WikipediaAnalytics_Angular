const express = require('express');
const app = express();
const revisionRoute = express.Router();

// Revision model
let Revision = require('../model/Revision');

// Add Revision
revisionRoute.route('/revisions').post((req, res, next) => {
  Revision.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all revision
revisionRoute.route('/revisions').get((req, res) => {
  Revision.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single revision by revid
revisionRoute.route('/revisions/:id').get((req, res) => {
  // Revision.findById(req.params.id, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })

  var id = req.params.id
  Revision.findOne({'revid': id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get all articles with their total number of revisions
revisionRoute.route('/articles/info').get((req, res) => {
  Revision.getArticlesTotalRevNum(function(err,result){
		if (err){
			console.log("controller getArticlesTotalRevNum" + err);
		}else{
      console.log(result);
			// articles = result;
      // res.jsonp({articles:articles});
      res.jsonp({result});
		}	
	})
})

// Get Distinct nonbot author numbers for each articles
revisionRoute.route('/articles/countAuthors').get((req, res) => {
  var userOrder = -1; //req.params.userOrder;
  Revision.userNumber(userOrder, function(err, result){
    if (err){
        console.log(err);
        console.log("showUserNum Aggregation Error");
        outputData = result;
        res.jsonp({userNum: outputData});
    }else{
        outputData = result;
        res.jsonp({result: outputData});
    }
  });
})

// Get history for all articles
revisionRoute.route('/articles/history').get((req, res) => {
  var hisOrder = -1; //req.params.userOrder;
  Revision.history(hisOrder, function(err, result){
    if (err){
        console.log(err);
        console.log("showHistory Aggregation Error");
        outputData = result;
        res.jsonp({history: outputData});
    }else{
        outputData = result;
        res.jsonp({result: outputData});
    }
});
})

revisionRoute.route('/authors/revisions').get((req, res) => {
  Revision.getAuthorRevisions(function(err,result){
    if (err){
        console.log("controller getAuthorRevisions" + err);
    }else{
        console.log(result);
        res.jsonp({revision30:result});
    }
  })
})

// Get single article by title
revisionRoute.route('/articles/:title').get((req, res) => {
  var selectedTitle = req.params.title;//req.query.selectedTitle;
  Revision.getTopUserFromTitle(selectedTitle,function(err,result){
    if (err){
      console.log("controller getTopUserFromTitle" + err);
    }else{
      console.log(result);
      res.jsonp({result:result});
    }
  })
})

revisionRoute.route('/articles/topUsers/:title/:num/').get((req, res) => {
  var num = req.params.num
  var selectTitleName = req.params.title; //req.query.selectTitleName;
  var titleTopUsers;
  var result;//json
  
  Revision.getTopUsersFromTitleUserNum(selectTitleName,num,function(err,result){
      if (err){
          console.log("controller getTopUsersFromTitleUserNum" + err);
      }else{
          console.log(result);
          titleTopUsers = result;
          res.jsonp({titleTopUsers:titleTopUsers});
      }
  })
})

revisionRoute.route('/authors/all').get((req, res) => {
  Revision.getTotalAuthorsName(function(err,result){
    if (err){
        console.log("controller authorsName" + err);
    }else{
        console.log(result);
        res.jsonp({revision30:result});
    }
  })
})

// Get Articles by number of authors (largest)
revisionRoute.route('/articles/userNumDesc/:num').get((req, res) => {
  var topNum = req.params.num;
  Revision.getArticleUserNumDesc(topNum, function(err,result){
    if (err){
        console.log("controller authorsName" + err);
    }else{
        console.log(result);
        res.jsonp({result:result});
    }
  })
})

// Get Articles by number of authors (smallest)
revisionRoute.route('/articles/userNumAsc/:num').get((req, res) => {
  var topNum = req.params.num;
  Revision.getArticleUserNumAsc(topNum, function(err,result){
    if (err){
        console.log("controller authorsName" + err);
    }else{
        console.log(result);
        res.jsonp({result:result});
    }
  })
})

// Get Articles by author name and number of revisions
revisionRoute.route('/articles/byAuthor/:name').get((req, res) => {
  var selectedAuthor = req.params.name; //req.query.selectedAuthor;
  var articles;

  Revision.getArticlesByAuthor(selectedAuthor,function(err,result){
    if (err){
        console.log("controller getArticlesByAuthor" + err);
    }else{
        console.log(result);
        res.jsonp({articles:result});
    }
  })
})

revisionRoute.route('/revisions/byAuthorTitle/:name/:title').get((req, res) => {
  var selectedAuthor = req.params.name; //req.query.selectedAuthor;
  var selectedTitle = req.params.title; //req.query.selectedTitle;

  Revision.getRevisionsByAuthorAndTitle(selectedAuthor,selectedTitle,function(err,result){
    if (err){
        console.log("controller findOneTitle" + err);
    }else{
        console.log(result);
        res.jsonp({revisions:result});
    }
  })
})

// Overall Bar chart
revisionRoute.route('/charts/barchart').get((req, res) => {
  Revision.overallBarChart(function(err, result){
    if (err){
        console.log(err);
        console.log("overallBarChart Error");
        console.log(result);
        return result;
    }else{
        //console.log(result);
        res.jsonp(result);
    }
});
})

// Overall Pie chart
revisionRoute.route('/charts/piechart').get((req, res) => {
  Revision.overallPieChart(function(err, result){
    if (err){
        console.log(err);
        console.log("overallPieChart Aggregation Error");
        console.log(result);
        return result;
    }else{
        //console.log(result);
        res.jsonp(result);
    }
  }); 
})

module.exports = revisionRoute;