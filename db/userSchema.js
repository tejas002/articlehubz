// require a connected instance of mongoose from ./connection.js
const mongoose = require('./connection')
const bcrypt = require('bcryptjs')

// define a Schema variable to create a new schema with
const Schema = mongoose.Schema

const User = new Schema(
    {   local: {
            username: String,
            password: String
        }
    }
)

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
  
User.methods.encrypt = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

// define schema
module.exports = mongoose.model("Users", User)


