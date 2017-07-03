var db = require('../queries');

// for validation
var emailEmpty = 'Email is required';
var emailInvalid = 'Email is not valid';
var passwordEmpty = 'Password is required';
var passwordInvalid = 'Passwords do not match';
var firstNameEmpty = 'First name is required';
var lastNameEmpty = 'Last name is required';
var addressEmpty = 'Address is required';

module.exports = function (app, passport) {

    /** GET home page. */
    app.get('/', function(req, res, next) {
        res.render('index');
    });

    // =========================================================================
    // LOCAL ROUTES ============================================================
    // =========================================================================

    app.post('/auth/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.post('/signup', function (req, res, next) {

        var password = req.body.password;

        standardUserChecks(req);
        req.checkBody('password', passwordEmpty).notEmpty();
        req.checkBody('password_confirmation', passwordInvalid).equals(req.body.password);

        return validateUsersPost(req, res, '/auth/signup');
    });

    app.post('/auth/signin', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.post('/signin', function (req, res, next) {
        req.checkBody('email', emailEmpty).notEmpty();
        req.checkBody('password', passwordEmpty).notEmpty();

        return validateUsersPost(req, res, '/auth/signin');
    });

    // =========================================================================
    // GOOGLE ROUTES ===========================================================
    // =========================================================================

    app.get('/auth/google',
        passport.authenticate('google', { scope:
            [ 'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
        ));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/profile');
        });

    // =========================================================================
    // FACEBOOK ROUTES =========================================================
    // =========================================================================
    app.get('/auth/facebook',
        passport.authenticate('facebook', {scope: ['email']}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        })
    );

    // =========================================================================
    // CATEGORY ROUTES =========================================================
    // =========================================================================

    /* Get mens categories page. */
    app.get('/men', function (req, res) {
        console.log('called men category');
        res.render ('categories', {
            // returns get items by gender
            gender: 'MEN',
            callback: '/categories/men'
        });

    });

    /* Get womens categories page. */
    app.get('/women', function (req, res) {
        res.render ('categories', {
            // returns get items by gender
            gender: 'WOMEN',
            callback: '/categories/women'
        });
    });

    var store;
    app.get("/men/:subcategory", function (req, res) {
        var subcat = req.params.subcategory;
        console.log(subcat);

        store = {
            gender: 'MEN',
            subcat: subcat.toUpperCase(),
            callback: '/categories/men/' + subcat
        };

        // because this plays up all the time
        res.redirect('/subcategory');
    });

    app.get('/subcategory', function (req, res) {
        res.render('sub_category', store);
    });

    app.get('/women/:subcategory', function (req, res) {
        var subcat = req.params.subcategory;

        store = {
            // returns get items by gender/category (shirt,tops,etc)
            gender: 'WOMEN',
            subcat: subcat,
            callback: '/categories/women/' + subcat
        }

        res.redirect('/subcategory');
    });





    // =========================================================================
    // KART ROUTES =============================================================
    // =========================================================================

    app.get('/kart', isLoggedInSpecialCase, db.test);

    app.get('/kart/checkout', isLoggedIn, function (req, res, next) {

        // call the correct function of the database,
        // now redirect to payment processed page
        res.sendStatus(200); // The checkout has been processed
    });

    // =========================================================================
    // USER ROUTES =============================================================
    // =========================================================================


    /** Returns the current logged in user to the caller */
    app.get('/user/info', isLoggedIn, function (req, res, next) {
        res.send(req.user);
    });

    /** Displays profile page */
    app.get('/profile', isLoggedIn, function (req, res, next) {
        res.render('profile');
    });

    /** Updates the profile */
    app.post('/profile', isLoggedIn, function (req, res, next) {
        // error checking first
        console.log('profile/update is called');

        standardUserChecks(req);

        var errors = req.validationErrors();
        if (errors) {
            console.log('ERRORS RETURNED');
            return res.render('profile', {
                error: errors
            });
        }

        console.log('NO ERRORS');

        // Now we must submit our results to our database for processing
        res.render('profile', {
            success_msg: 'Profile has been updated'
        });
    });

    // =========================================================================
    // LOGIN/OUT ROUTES ========================================================
    // =========================================================================
    /** Displays the login page */
    app.get('/login', function (req, res, next) {
        if (req.isAuthenticated())
            return res.render('profile');

        res.render('login');
    });

    /** Logs current user out of the session */
    app.get('/logout', isLoggedIn, function (req, res) {
        // implement logout functionality
        req.logout();
        res.render('login');
    });

    // =========================================================================
    // DATABASE ROUTES =========================================================
    // =========================================================================

    /* Database Query Routes */
    //app.get('/items/:category', db.getItemsByCategory);
    // app.get('/category/:gender', db.test);
    app.get('/categories/:gender', db.getItemsByGender);
    app.get('/categories/:gender/:category', db.getItemsByCategory);
    // app.get('/categories/:gender/:category', db.test);
    //app.get('/categories/:gender/:category/:subcategory', db.getItemsBySubcategory);
    app.get('/categories/:gender/:category/:subcategory', db.test);
    app.get('/search/:desc', db.getItemsByDescription);
    app.get('/price/:minPrice-:maxPrice', db.getItemsByPrice);
    app.get('/item/:itemid', db.getItemByItemID);
    app.delete('/kart/removeItem/:email/:itemID', isLoggedIn, db.removeItemFromKart);
    app.get('/test', db.test);

};



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
    res.redirect('/login');
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

function standardUserChecks (req) {
    req.checkBody('email', emailEmpty).notEmpty();
    req.checkBody('email', emailInvalid).isEmail();
    req.checkBody('first_name', firstNameEmpty).notEmpty();
    req.checkBody('last_name', lastNameEmpty).notEmpty();
    req.checkBody('address', addressEmpty).notEmpty();

}

function validateUsersPost (req, res, route) {
    var errors = req.validationErrors();

    if (errors) {
        return res.render('login', {
            error: errors
        });
    }

    res.redirect(307, route);
}