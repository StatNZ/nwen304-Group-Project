var express = require('express');
var router = express.Router();
var db = require('../queries');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

/* Passport JS Authorisation */ 
passport.use(new GoogleStrategy({
    clientID:     "1060806220702-7k0jve0rtn7nmff3mc44fjsfbotp2vpt.apps.googleusercontent.com",
    clientSecret: "KrpEmRGvTGXHx_TZEodl-6bk",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log("Access Token: " + accessToken); 
      return done(null, profile);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: 238120290008806,
    clientSecret: 'b5291cbe9d73872bed7743f39d2f3fe1',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    passReqToCallback   : true
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Database Query Routes */
router.get('/items/:categoryid', db.getItemsByCategory);
router.get('/item/:itemid', db.getItemByItemID);
router.get('/test', db.test);

/* Passport JS Routes */
router.get('/auth/google',
  passport.authenticate('google', { scope: 
  	[ 'https://www.googleapis.com/auth/plus.login' ] }
));
 
router.get('/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/'
}));

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
