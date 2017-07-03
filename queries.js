var pg = require('pg');

//var connectionString = 'postgres://lewiskier:nwen304databasepass@depot:5432/lewiskier_jdbc';
// var connectionString = 'postgres://monaruan:urban@localhost:5432/urban_apparel';
var connectionString = 'postgres://jackmac:urban@localhost:5432/urban_apparel';
// var connectionString = 'postgres://mwfhvxkwcmovyn:75c651736433430e45e42fd6b0e1ac98a67d7ecc15792ea738fdc7a8a7f94c14@ec2-174-129-227-116.compute-1.amazonaws.com:5432/deqra3kji894nd';


function test(req, res, next) {
	const queryText = "SELECT * FROM category WHERE gender = $1";
	const values = ['C'];

   client = new pg.Client(connectionString);
   client.connect();

	var query = client.query(queryText, values);
	var results = [];

	query.on('row', function(row) {
   	results.push(row);
   });

   query.on('error', function(error) {
		console.log(error);
   });

	query.on('end', function() {
   	client.end();
      res.json(results);
   });
}

function getItemsByGender(req, res, next) {
    var gender = req.params.gender.toUpperCase();
    client = new pg.Client(connectionString);
    client.connect();

    // var query = client.query("SELECT * FROM item WHERE subcategoryid IN " +
    //     "(SELECT s.SubCategoryID FROM subcategory s " +
    //     "INNER JOIN category c ON s.CategoryID = c.CategoryID " +
    //     "WHERE c.gender = '" + gender + "')");
    var query = client.query("SELECT * FROM category WHERE gender = '" + gender + "'");
    var results = [];

   query.on('row', function(row) {
   	results.push(row);
   });

   query.on('error', function(err) {
   	console.log(err);
	});

   query.on('end', function() {
   	client.end();
   	res.json(results);
   });
}

function getItemsByCategory(req, res, next) {
    var gender = req.params.gender.toUpperCase();
    var category = req.params.category;

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query("SELECT * FROM item WHERE subcategoryid IN " +
        "(SELECT s.SubCategoryID FROM subcategory s " +
        "INNER JOIN category c ON s.CategoryID = c.CategoryID " +
        "WHERE c.gender = '" + gender + "' AND c.name = '" + category + "')");
    var results = [];

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        client.end();
        res.json(results);
    });
}

function getItemsBySubcategory(req, res, next) {
    var gender = req.params.gender;
    var category = req.params.category;
    var subcategory = req.params.subcategory;

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query("SELECT * FROM item " +
        "WHERE subcategoryid IN (SELECT s.SubCategoryID " +
        "FROM subcategory s " +
        "INNER JOIN category c ON s.CategoryID = c.CategoryID " +
        "WHERE c.gender = '" + gender + "' AND c.name = '" + category + "' AND s.name = '" + subcategory + "')");
    var results = [];

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        client.end();
        res.json(results);
    });
}

function getItemsByDescription(req, res, next){
    var desc = req.params.desc;

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query("SELECT * FROM item WHERE LOWER(description) LIKE LOWER('%" + desc + "%')");
    var results = [];

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        client.end();
        res.json(results);
    });
}

function getItemsByPrice(req, res, next) {
    var minPrice = req.params.minPrice;
    var maxPrice = req.params.maxPrice;

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query("SELECT * FROM item WHERE price BETWEEN " + minPrice + " AND " + maxPrice);
    var results = [];

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        client.end();
        res.json(results);
    });
}

function getItemByItemID(req, res, next) {
    var itemID = parseInt(req.params.itemid);

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query("SELECT * FROM item WHERE itemID = " + itemID);
    var results = [];

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        client.end();
        res.json(results);
    });
}

function getKart(req, res, next) {
    var email = req.params.email;

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query("SELECT itemid, quantity " +
        "FROM purchasedetails pd INNER JOIN purchase p ON p.purchaseid = pd.purchaseid WHERE email = '" + email + "'");
    var results = [];

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
        client.end();
        res.json(results);
    });
}

function removeItemFromKart(req, res, next) {
    var itemID = parseInt(req.params.itemID);
    var email = req.params.email;

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query("DELETE FROM purchasedetails pd WHERE itemid = " + itemID + " AND purchaseid IN (SELECT purchaseid FROM purchase WHERE email = '" + email + "')");

    query.on('end', function() {
        client.end();
        res.json({
            status: "success",
            message: "Removed item " + itemID + " from " + email +  "'s kart"
        });
    });
}
function addItemToKart(req, res, next) {
    const queryText = "INSERT INTO purchasedetails(purchaseID, itemID, quantity) " +
        "SELECT purchaseID, $1, $3 FROM purchase " +
        "WHERE customerID = $2";
    const values = [parseInt(req.params.itemID), parseInt(req.params.customerID), req.params.quantity];


    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query(queryText, values);

    query.on('error', function(err) {
        console.log(err);
    });

    query.on('end', function() {
        client.end();
        res.json({
            status: "success",
            message: "Added item to kart"
        });
    });
}


function updateUser(req, res, next) {
    const queryText = "UPDATE customer " +
        "SET firstname = $1, lastname = $2, address = $3, email = $4, password = $5 " +
        "WHERE customerid = $6";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.address,
        req.body.email,
        req.body.password,
        parseInt(req.params.customerID)
    ];

    console.log(req.body.firstname);

    client = new pg.Client(connectionString);
    client.connect();

    var query = client.query(queryText, values);

    query.on('error', function(err) {
        console.log(err);
    });

    query.on('end', function() {
        client.end();
        res.json({
            status: "success",
            //message: "Updated user " + itemID + " to kart"
        });
    });
}

module.exports = {
    connectionString: connectionString,
    test: test,
    getItemsByGender: getItemsByGender,
    getItemsByCategory: getItemsByCategory,
    getItemsBySubcategory: getItemsBySubcategory,
    getItemsByDescription: getItemsByDescription,
    getItemsByPrice: getItemsByPrice,
    getItemByItemID: getItemByItemID,
    getKart: getKart,
    removeItemFromKart: removeItemFromKart,
    addItemToKart: addItemToKart,
    updateUser: updateUser
};