const express = require('express')
const Article = require('../db/articleSchema');
const router = express.Router()

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to Unauthorised Page
  res.render('unauthorized');
}


// GET list of articles .It does not show other user artilces//
router.get('/view',authenticatedUser, function(req, res) {
  
  Article.find({$or:[{userid:req.user._id},{userid:null}]}).sort('-postDate').populate('userid', 'local.username')
    .then(function(article) {
      
      if(article.length==0){
        res.render('articles-index', { message: 'No Articles Found!!' })
      }
      else{res.render('articles-index', { articles: article })}
    })
})


router.get('/create', function(req, res) {
    res.render('article-create')
})

// CREATE new article //
router.post('/create', function(req, res) {
  if(req.user){req.body.article.userid=req.user._id}
    Article.create(req.body.article)
        .then(function(article) {
        res.redirect(`/articles`)
    })
})

// Finding an article //
router.get('/edit/:_id', function(req, res) {
  Article.findOne({ _id: req.params._id })
    .then(function(data) {
        res.render('article-edit', { article: data })
    })
})

// UPDATE existing article //
router.put('/edit/:_id', function(req, res) {
  Article.findOneAndUpdate({ _id: req.params._id }, req.body.article, { new: true })
    .then(function() {
      res.redirect('/articles')
    })
})

// DELETE article //
router.delete('/delete/:_id', function(req, res) {
  Article.findOneAndRemove({ _id: req.params._id })
    .then(function() {
      res.redirect('/articles')
    })
})

router.get('/*', function(req, res) {
  res.render('errors')
})


module.exports = router
