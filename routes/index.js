var express = require('express');
var router = express.Router();
var db = require('../queries');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

//var User = require ('users');

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

/* Passport JS Routes for Google */
router.get('/auth/google',
    passport.authenticate('google', { scope:
        [ 'https://www.googleapis.com/auth/plus.login' ] }
    ));

router.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

var fbOpts = {
    clientID: 238120290008806,
    clientSecret: 'b5291cbe9d73872bed7743f39d2f3fe1',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    passReqToCallback: true
};

var fbCallback = function (accessToken, refreshToken, profile, done) {
    // asynchronous
    // process.nextTick(function() {
    //
    //     // find the user in the database based on their facebook id
    //     User.findOne({'facebook.id': profile.id}, function (err, user) {
    //
    //         // if there is an error, stop everything and return that
    //         // ie an error connecting to the database
    //         if (err)
    //             return done(err);
    //
    //         // if the user is found, then log them in
    //         if (user) {
    //             return done(null, user); // user found, return that user
    //         } else {
    //             // if there is no user found with that facebook id, create them
    //             var newUser = new User();
    //
    //             // set all of the facebook information in our user model
    //             newUser.facebook.id = profile.id; // set the users facebook id
    //             newUser.facebook.token = token; // we will save the token that facebook provides to the user
    //             newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
    //             newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
    //
    //             // save our user to the database
    //             newUser.save(function (err) {
    //                 if (err)
    //                     throw err;
    //
    //                 // if successful, return the new user
    //                 return done(null, newUser);
    //             });
    //         }
    //     });
    // });
};

passport.use (new FacebookStrategy (fbOpts, fbCallback));

router.get('/auth/facebook',
    passport.authenticate ('facebook'));

router.get ('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/categories' }),
    function (req, res) {
        res.redirect('/');
    });

/* Database Query Routes */
//router.get('/items/:category', db.getItemsByCategory);
router.get('/categories/:gender', db.getItemsByGender);
router.get('/categories/:gender/:category', db.getItemsByCategory);
router.get('/categories/:gender/:category/:subcategory', db.getItemsBySubcategory);
router.get('/search/:desc', db.getItemsByDescription);
router.get('/price/:minPrice-:maxPrice', db.getItemsByPrice);
router.get('/item/:itemid', db.getItemByItemID);
router.get('/kart/:email', db.getKart);
router.get('/test', db.test);

/**
 * In order for the below code to work, we need to be able to
 * have access to the current users id, then search for all
 * the items belonging to that user that have not been processed.
 * If the user cannot be found, then we must use the guest access account
 * not to sure how this will work.
 */
// router.get('/kart_items', db.getUserKartItems);

router.get('/sub_category', function (req, res) {
    res.render('sub_category');
})

/* Get categories page. */
router.get('/categories_men', function (req, res) {
    res.render ('categories');

});

/* Get categories page. */
router.get('/categories_women', function (req, res) {
    res.render ('categories');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* Search Query */
router.get('/search', function (req, res) {
    console.log('searching for: ' + req.body.item);
});

module.exports = router;
