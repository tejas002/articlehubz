// require a connected instance of mongoose from ./connection.js
const mongoose = require('./connection');

// define a Schema variable to create a new schema with
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        title: String,
        url: String,
        description: String,
        postDate: { type: Date, default: Date.now },
        userid: {
            type: Schema.ObjectId,
            ref: 'Users'
        }
    }
)

// define schema
const Article = mongoose.model("Articles", ArticleSchema)

module.exports = Article
