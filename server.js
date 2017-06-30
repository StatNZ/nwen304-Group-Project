var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var exphbs = require('express-handlebars');
var path = require('path');

var passport = require('passport');
//var flash    = require('connect-flash');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var port = process.env.PORT || 3000;

require('./config/paspport')(passport);

// forces us to become https
// must go live on heroku
// app.use(function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//         res.redirect(['https://urbanapparel.herokuapp.com', req.url].join(''));
//     }
//     next();
// });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static path setup, must be above session vars, otherwise, session
// will be logged for each static request
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'urbanApparelSecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/** ROUTES pass appropriate variables to functions **/
require('./app/routes')(app, passport);

app.listen(port);
console.log ('Urban Apparel listening on localhost:3000');