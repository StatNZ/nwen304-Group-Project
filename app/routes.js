var db = require('../queries');

module.exports = function (app, passport) {

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
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    /**
     * Accesses all our cart items regarding our specific user
     *
     * CHANGE TEST TO THE APPROPRIATE DB CALL WHEN LIVE
     */
    app.get('/kart_items', isLoggedInSpecialCase, db.test);

    app.get('/sub_category', function (req, res) {
        res.render('sub_category');
    })

    /* Get categories page. */
    app.get('/categories_men', function (req, res) {
        res.render ('categories');

    });

    /* Get categories page. */
    app.get('/categories_women', function (req, res) {
        res.render ('categories');
    });

    /* GET home page. */
    app.get('/', function(req, res, next) {
        res.render('index');
    });

    /* SEARCH route */
    app.get('/search', function (req, res, next) {
        var item = req.body.item;
        console.log(req.body);
        res.sendStatus(200);
    });

    /**
     * Returns the current logged in user to the caller
     */
    app.get('/user_info', isLoggedIn, function (req, res, next) {
        res.send(req.user);
    });

    /**
     * Displays profile page
     */
    app.get('/profile', function (req, res, next) {
        res.redirect('/login');
    });

    /**
     * Displays the login page
     */
    app.get('/login', function (req, res, next) {
        if (req.isAuthenticated())
            return res.render('profile');

        res.render('login');
    });

    /**
     * Logs current user out of the session
     */
    app.get('/logout', isLoggedIn, function (req, res) {
        // implement logout functionality
        req.logout();
        res.render('login');
    });

    /* Database Query Routes */
    //app.get('/items/:category', db.getItemsByCategory);
    app.get('/categories/:gender', db.getItemsByGender);
    app.get('/categories/:gender/:category', db.getItemsByCategory);
    app.get('/categories/:gender/:category/:subcategory', db.getItemsBySubcategory);
    app.get('/search/:desc', db.getItemsByDescription);
    app.get('/price/:minPrice-:maxPrice', db.getItemsByPrice);
    app.get('/item/:itemid', db.getItemByItemID);
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