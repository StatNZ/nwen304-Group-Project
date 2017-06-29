var express = require('express');
var router = express.Router();
var db = require('../queries');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require ('../routes/users');

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

router.use(passport.initialize());

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user.userId)
    done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser: ' + id);
    User.findById(id, function(err, user){
        done(err, user);
    })
});

var fbOpts = {
    clientID: 238120290008806,
    clientSecret: 'b5291cbe9d73872bed7743f39d2f3fe1',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'displayName']
};

var fbCallback = function (accessToken, refreshToken, profile, done) {
    // asynchronous
    process.nextTick (function () {

        // find the user in the database based on their facebook id
        User.findOne (profile.id, function (err, user) {

            if (err) {
                return done(err);
            }

            if (user) {
                console.log('log in the user: ' + user.user_name);
                return done(null, user);
            }

            else {
                // create a new user

                var newUser = new User();
                newUser.userId = profile.id;
                newUser.user_name = profile.displayName;
                newUser.accessToken = accessToken;
                newUser.email = profile.emails[0].value;

                //insert into the database
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return done(null, null); // should redirect us to the login page
                    }

                    return done(null, newUser);
                })
            }
        });
    });
};

passport.use (new FacebookStrategy (fbOpts, fbCallback));

router.get('/auth/facebook',
    passport.authenticate ('facebook', { scope : ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/categories_men'
    })
);

/* Database Query Routes */
//router.get('/items/:category', db.getItemsByCategory);
router.get('/categories/:gender', db.getItemsByGender);
router.get('/categories/:gender/:category', db.getItemsByCategory);
router.get('/categories/:gender/:category/:subcategory', db.getItemsBySubcategory);
router.get('/search/:desc', db.getItemsByDescription);
router.get('/price/:minPrice-:maxPrice', db.getItemsByPrice);
router.get('/item/:itemid', db.getItemByItemID);
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

router.get('/test', db.test);

// /* Search Query */
// router.get('/search', function (req, res) {
//     console.log('searching for: ' + req.body.item);
// });

module.exports = router;
