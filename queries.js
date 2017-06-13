var pg = require('pg');

var connectionString = 'postgres://lewiskier:nwen304databasepass@depot:5432/lewiskier_jdbc';

function test(req, res, next) {
  client = new pg.Client(connectionString);
  client.connect();
  var query = client.query("SELECT * FROM item");
  var results = [];

  query.on('row', function(row) {
    results.push(row);
  });

  query.on('end', function() {
    client.end();
    res.json(results);
  });
}

function getItemsByCategory(req, res, next) {
  var categoryID = parseInt(req.params.categoryid);	
	
  client = new pg.Client(connectionString);
  client.connect();

  var query = client.query("SELECT * FROM item WHERE categoryID = " + categoryID);
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

module.exports = {
  test: test,
  getItemsByCategory: getItemsByCategory,
  getItemByItemID: getItemByItemID
};
