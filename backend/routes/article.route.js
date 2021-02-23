const express = require('express');
const app = express();
const articleRoute = express.Router();

// Article model
let article = require('../model/Article');

// Add Revision
articleRoute.route('/articles').post((req, res, next) => {
  Revision.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all revision
articleRoute.route('/revisions').get((req, res) => {
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
  Revision.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



module.exports = revisionRoute;