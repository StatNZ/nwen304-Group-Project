var express = require('express');
var router = express.Router();

var db = require ('../queries');
var pg = require ('pg');

var client;
function connectDB () {
    client = new pg.Client(db.connectionString);
    client.on('drain', client.end.bind(client));  // disconnect client when done
    client.connect ();
}

function User() {
    this.userId = '';
    this.user_name = '';
    this.email = '';
    this.accessToken = '';

    this.save = function (callback) {
        connectDB();

        client.query('INSERT INTO customer(CustomerID, AccessToken, Name, Email) VALUES($1, $2, $3, $4)',
            [this.userId, this.accessToken, this.user_name, this.email], function (err, result) {
                if (err)
                    return callback(err, null) // error inserting into db
            });

        return callback(null, null); // user should be created on next screen

    }
}

/**
 * Finds the current user in the database by their id.
 * @param id
 * @param callback
 */
User.findOne = function (id, callback) {
    // connect to the db
    // search for the user with the id

    connectDB();
    client.query("SELECT * FROM customer WHERE CustomerID=$1", [id], function (err, result) {
        if (err)
            return callback(err, null);

        if (result.rows.length > 0) {
            // we have found our person
            var newUser = new User();
            newUser.user_name = result.rows[0].name;
            newUser.accessToken = result.rows[0].acesstoken;
            newUser.userId = result.rows[0].customerid;
            newUser.email = result.rows[0].email;
            console.log('finishing find one\n'+result.rows[0]);
            return callback(null, newUser);
        }

        return callback(null, null);
    })
};

module.exports = User;
