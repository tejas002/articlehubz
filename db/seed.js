var mongoose  = require("./connection")
var data  = require("./data")
var userData = require('./userData')
var Article = require('./articleSchema')
var User = require('./userSchema')

// var Article = mongoose.model("Articles");

Article.remove({}).then(function() {
  Article.collection.insert(data).then(function() {
    process.exit();
  })
})

User.remove({}).then(function() {
    User.collection.insert(userData).then(function() {
        process.exit();
    })
})
