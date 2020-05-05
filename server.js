const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const articles = require('./controllers/articles')

// passport imports
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
app.use(morgan('dev'))

// app.use(express.static(__dirname + '/public'))
app.use('/assets', express.static('public'))

app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// middleware configs
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(session(
    {
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }
));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./config/passport')(passport);

//Updating Default Handlebar Layout when user signups for all URL
app.all('/*', function (req, res, next) {

    if (req.user) {
        req.app.locals = { layout: 'main', data: { salutation: 'Logout', href: '/logout', class: "fa fa-sign-out fa-lg" }, "username": req.user.local.username }

    } else {
        req.app.locals = { layout: 'main', "data": { salutation: 'Login', href: '/', class: "fa fa-sign-in fa-lg" }, "showTab": 'False' }
    }

    next();
});

var routes = require('./config/routes');
app.use(routes);


app.get('/', (req, res) => {
    if (!req.user) {
        res.render('home', { showDiv: 'False' });
    }
    else {
        res.render('home');
    }

})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.use('/articles', articles)

app.all('*', function (req, res) {
    res.render('errors');
});

// define port
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('The application is up and running on port ', port)
})


