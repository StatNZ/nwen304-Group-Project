var express = require('express');
var session = require('express-session');
var router = express.Router();
var db = require('../queries');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require ('../routes/users');


router.use(session({
    secret: 'urbanApparelSecretKey',
    resave: true,
    saveUninitialized: true
} ));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user.userId)
    done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser: ' + id);
    User.findOne(id, function(err, user){
        done(err, user);
    })
});

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

/** FACEBOOK ROUTES AND STRATEGY **/
var fbOpts = {
    clientID: 238120290008806,
    clientSecret: 'b5291cbe9d73872bed7743f39d2f3fe1',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'displayName', 'gender']
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
                console.log('User is now logged in as: ' + user.user_name);
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
        failureRedirect : '/login'
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
 * Accesses all our cart items regarding our specific user
 *
 * CHANGE TEST TO THE APPROPRIATE DB CALL WHEN LIVE
 */
router.get('/kart_items', isLoggedInSpecialCase, db.test);

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

/* SEARCH route */
router.get('/search', function (req, res, next) {

});

/**
 * Returns the current logged in user to the caller
 */
router.get('/user_info', isLoggedIn, function (req, res, next) {
    res.send(req.user);
});

router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('profile');
})

router.get('/login', function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    res.render('login');
});

/**
 * Logs current user out of the session
 */
router.get('/logout', isLoggedIn, function (req, res) {
    // implement logout functionality
    req.logout();
    res.render('login');
});

/** for testing purposes */
router.get('/test', db.test);

/**
 * Checks whether the user is currently logged in via a session
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // user is not logged in, raise error for user
    console.log ('user not logged in');
    //res.sendStatus(404);
    res.redirect('/');
}

/**
 * Used for if interacting with an ajax call for database
 * information. Stops the client from freezing by sending
 * back a 404 error
 */
function isLoggedInSpecialCase (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // user is not logged in, raise error for user
    console.log ('user not logged in');
    res.sendStatus(404);
}


module.exports = router;
