var express = require('express');
var router = express.Router();

var db = require ('../queries');
var pg = require ('pg');

var client = new pg.Client (db.connectionString);

function User() {
    this.userId = '';
    this.email = '';
    this.user_name = '';
    this.email = '';
    this.accessToken = '';

    this.save = function (callback) {
        var conString = db.connectionString;
        var client = new pg.Client (conString);
        client.connect();
    }
}

module.exports = router;
