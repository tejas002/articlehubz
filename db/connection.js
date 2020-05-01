const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

// establish mongo connection
mongoose.connect("mongodb://localhost/articlehub", {useNewUrlParser: true,useUnifiedTopology: true}).then(() => console.log('Connected to DB'))
.catch(err =>console.dir('Some Error Occured while connecting',err));


mongoose.Promise = Promise
module.exports = mongoose;
