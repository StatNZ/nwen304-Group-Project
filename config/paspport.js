/**
 * Created by Status O'Brien on 30/06/17.
 */

// config/passport.js

var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');  // use for encryption
var uuidv1 = require('uuid/v1');        // use to generate a unique id



// need user model
var User = require('../app/users');

// need auth
var configAuth = require('./auth');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        console.log('serializeUser: ' + user.userId)
        done(null, user.userId);
    });

    passport.deserializeUser(function(id, done) {
        console.log('deserializeUser: ' + id);
        User.findOne(id, function(err, user){
            done(null, user);
        })
    });

    // =========================================================================
    // LOCAL STRATEGY ==========================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            firstNameField : 'first_name',
            lastNameField : 'last_name',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, email, password, done) {

            // if (!validateEmail(email))
            //     return done(null, false, req.flash('error_msg', 'The email is not valid'));
            //
            // // the first check to sign up, check passwords
            // if (password != req.body.password_confirmation)
            //     return done(null, false, req.flash('error_msg', 'The passwords do not match'));

            process.nextTick(function () {
                User.findByEmail(email, function (err, user) {

                    if (err)
                        return done(err);

                    if (user) {
                        console.log('user already in db');
                        return done(null, false, req.flash('error_msg', 'That email is already taken'));
                    }

                    else {
                        // create the user
                        var newUser = new User();
                        newUser.userId = uuidv1();
                        newUser.email = email;
                        newUser.user_name = req.body.first_name + ' ' + req.body.last_name;
                        newUser.first_name = req.body.first_name;
                        newUser.last_name = req.body.last_name;
                        newUser.address = req.body.address;
                        newUser.password = bcrypt.hashSync(password, null, null); // encrypt password

                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            return done(err, newUser);
                        })
                    }
                });
            })
        }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {

            if (!validateEmail(email))
                return done(null, false, req.flash('error_msg', 'The email is not valid'));
            process.nextTick(function () {

                User.findByEmail(email, function (err, user) {
                   if (err)
                       return done(err);

                   if (user) {
                       // need to check the password is correct
                       console.log(user.email, user.password);
                       if (user.password != '' && bcrypt.compareSync(password, user.password))
                           return done(null, user);
                   }

                    // otherwise we need to throw an error
                    return done(null, false, req.flash('error_msg', 'Invalid email/password'));
                });
            })
        }
    ));

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // =========================================================================
    // GOOGLE STRATEGY =========================================================
    // =========================================================================

    passport.use(new GoogleStrategy({
            clientID : configAuth.googleAuth.clientID,
            clientSecret : configAuth.googleAuth.clientSecret,
            callbackURL : configAuth.googleAuthHeroku.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            console.log('made it to function');
            process.nextTick(function () {

                // find the user in the database based on their facebook id
                User.findOne (profile.id, function (err, user) {
                    console.log('made it to find one');
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        console.log('User is now logged in with google as: ' + user.user_name);
                        return done(null, user);
                    }

                    else {
                        // create a new user
                        var newUser = new User();
                        newUser.userId = profile.id;
                        newUser.user_name = profile.displayName;
                        //newUser.first_name = profile.name.givenName;
                        //newUser.last_name = profile.name.familyName;
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
        }
    ));

    // =========================================================================
    // FACEBOOK STRATEGY =======================================================
    // =========================================================================

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'emails', 'name', 'displayName', 'gender']
    },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous
            process.nextTick (function () {

                // find the user in the database based on their facebook id
                User.findOne (profile.id, function (err, user) {

                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        console.log('User is now logged in with facebook as: ' + user.user_name);
                        return done(null, user);
                    }

                    else {
                        // create a new user
                        var newUser = new User();
                        newUser.userId = profile.id;
                        newUser.user_name = profile.displayName;
                        newUser.first_name = profile.name.givenName;
                        newUser.last_name = profile.name.familyName;
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
        }
    ));


};