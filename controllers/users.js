var passport = require("passport")

// GET /signup
function getSignup(request, response) {
  if (request.isAuthenticated()) {
    response.redirect('/')
  }
  else {
    response.render("signup.handlebars", { message: request.flash('signupMessage') });
  }
}

// POST /signup
function postSignup(request, response) {
  var signupStrategy = passport.authenticate('local-signup', {
    successReturnToOrRedirect: '/',
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
  });
  return signupStrategy(request, response);
}

// GET /login
function getLogin(request, response) {
  if (request.isAuthenticated()) {
    response.redirect('/')
  }
  else {
    response.render('login.handlebars', { message: request.flash('loginMessage'), infoMessage: 'Login to view this page' })
  }
}

// POST /login
function postLogin(request, response) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect: '/articles',
    failureRedirect: '/login',
    failureFlash: true
  });
  return loginProperty(request, response);
}

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
}

// Restricted page
function secret(request, response) {

  if (request.user) {
    response.redirect('/articles/view');
  }
  else {
    response.render('articles-index');
  }
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
};
