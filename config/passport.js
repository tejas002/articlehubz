var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/userSchema');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, callback) {
        User.findById(id, function(err, user) {
            callback(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, callback) {
        // Find a user with this e-mail
        User.findOne({
            'local.username': username
        }, function(err, user) {
            if (err) return callback(err);

            // If there already is a user with this email
            if (user) {
                return callback(null, false, req.flash('signupMessage', 'This username is already used.'));
            } else {
                // There is no email registered with this email

                // Create a new user
                var newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.encrypt(password);

                newUser.save(function(err) {
                    if (err) throw err;
                    return callback(null, newUser);
                });
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, callback) {
        //Validating Username and password for null values
        // console.log('UserFileds',username,password)
        // if(!username && !password)
        // {
        //   return callback(null, false, req.flash('loginMessage', 'Enter Username and Password.'));
        // }
        // else if(!username){
        //   return callback(null, false, req.flash('loginMessage', 'Enter Username.'));
        // }
        // else if(!password){
        //   return callback(null, false, req.flash('loginMessage', 'Enter Password.'));
        // }


        // Search for a user with this email
        User.findOne({
            'local.username': username
        }, function(err, user) {
            if (err) {
                return callback(err);
            }

            // If no user is found
            if (!user) {

                return callback(null, false, req.flash('loginMessage', 'No user found.'));
            }
            // Wrong password
            if (!user.validPassword(password)) {

                return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return callback(null, user);
        });
    }));
};