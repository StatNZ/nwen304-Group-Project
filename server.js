var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var exphbs = require('express-handlebars');
var path = require('path');

var passport = require('passport');
var flash    = require('connect-flash');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

require('./config/paspport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // log every request to the console
app.use(cookieParser());
app.use( bodyParser.urlencoded({
    extended: true
}));
app.use( bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'urbanApparelSecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


/** ROUTES pass appropriate variables to functions **/
require('./app/routes')(app, passport);

app.listen(3000);
console.log ('listening on localhost:3000');