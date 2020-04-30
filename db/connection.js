const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

// establish mongo connection
mongoose.connect("mongodb://localhost/articlehub", {useMongoClient: true})


mongoose.Promise = Promise
module.exports = mongoose;
