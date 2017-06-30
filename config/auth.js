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
        'clientID' : '1060806220702-7k0jve0rtn7nmff3mc44fjsfbotp2vpt.apps.googleusercontent.com',
        'clientSecret' : 'KrpEmRGvTGXHx_TZEodl-6bk',
        'callbackURL' : 'http://localhost:3000/auth/google/callback'
    }
};
