/**
 * Created by Status O'Brien on 30/06/17.
 */

// config/auth.js

module.exports = {

    'facebookAuth' : {
        'clientID' : 238120290008806,
        'clientSecret' :'b5291cbe9d73872bed7743f39d2f3fe1',
        'callbackURL' : 'http://localhost:3000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID' : '290217801845-6gqnkp4o1f93r9j4ufd6pve20raqq38s.apps.googleusercontent.com',
        'clientSecret' : 'lXTydNj7IA4HE6lPOoRSgZtG',
        'callbackURL' : 'http://localhost:3000/auth/google/callback'
    },

    'googleAuthHeroku' : {
        'clientID' : '290217801845-6gqnkp4o1f93r9j4ufd6pve20raqq38s.apps.googleusercontent.com',
        'clientSecret' : 'lXTydNj7IA4HE6lPOoRSgZtG',
        'callbackURL' : 'https://urbanapparel.herokuapp.com/auth/google/callback'
    },

    'facebookAuthHeroku' : {
        'clientID' : 238120290008806,
        'clientSecret' :'b5291cbe9d73872bed7743f39d2f3fe1',
        'callbackURL' : 'http://urbanapparel.herokuapp.com/auth/facebook/callback'
    }
};
