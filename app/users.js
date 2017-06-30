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
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.accessToken = '';
    this.address = '';
    this.password = '';

    this.save = function (callback) {
        connectDB();
        console.log('Saving new user into database');
        client.query('INSERT INTO customer(CustomerID, FirstName, LastName, AccessToken, Name, Email, Address, Password) ' +
            'VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            [this.userId, this.first_name, this.last_name, this.accessToken, this.user_name,
                this.email, this.address, this.password], function (err, result) {
                if (err)
                    return callback(err, null) // error inserting into db
            });

        return callback(null, null); // user should be created on next screen

    }
}

User.findByEmail = function (email, callback) {
    connectDB();
    console.log('find by email function');

    client.query("SELECT * FROM customer WHERE Email=$1", [email], function (err, result) {
        if (err)
            return callback(err, null);

        if (result.rows.length > 0) {
            return callback(err, buildUser(result));
        }

        return callback(null, null);
    })
};

/**
 * Finds the current user in the database by their id.
 * @param id
 * @param callback
 */
User.findOne = function (id, callback) {
    // connect to the db
    // search for the user with the id
    console.log('Accessed findone function');

    connectDB();
    client.query("SELECT * FROM customer WHERE CustomerID=$1", [id], function (err, result) {
        if (err)
            return callback(err, null);

        if (result.rows.length > 0) {
            return callback(err, buildUser(result));
        }

        return callback(null, null);
    })
};

function buildUser (result) {
    var newUser = new User();
    newUser.user_name = result.rows[0].name;
    newUser.first_name = result.rows[0].firstname;
    newUser.last_name = result.rows[0].lastname;
    newUser.accessToken = result.rows[0].acesstoken;
    newUser.userId = result.rows[0].customerid;
    newUser.email = result.rows[0].email;
    newUser.address = result.rows[0].address;
    newUser.password = result.rows[0].password;
    return newUser
}

module.exports = User;
