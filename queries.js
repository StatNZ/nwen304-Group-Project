var pg = require('pg');

var connectionString = 'postgres://lewiskier:nwen304databasepass@depot:5432/lewiskier_jdbc';

function test(req, res, next) {
  client = new pg.Client(connectionString);
  client.connect();
  var query = client.query("SELECT * FROM item WHERE description LIKE '%Black%'"); 
  var results = [];

  query.on('row', function(row) {
    results.push(row);
  });

  query.on('end', function() {
    client.end();
    res.json(results);
  });
}

function getItemsByGender(req, res, next) {
  var gender = req.params.gender;
  client = new pg.Client(connectionString);
  client.connect();
  
  var query = client.query("SELECT * FROM item WHERE subcategoryid IN (SELECT s.SubCategoryID FROM subcategory s INNER JOIN category c ON s.CategoryID = c.CategoryID WHERE c.gender = '" + gender + "')");
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
  var gender = req.params.gender;
  var category = req.params.category;	
	
  client = new pg.Client(connectionString);
  client.connect();

  var query = client.query("SELECT * FROM item WHERE subcategoryid IN (SELECT s.SubCategoryID FROM subcategory s INNER JOIN category c ON s.CategoryID = c.CategoryID WHERE c.gender = '" + gender + "' AND c.name = '" + category + "')");
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
  
  var query = client.query("SELECT * FROM item WHERE subcategoryid IN (SELECT s.SubCategoryID FROM subcategory s INNER JOIN category c ON s.CategoryID = c.CategoryID WHERE c.gender = '" + gender + "' AND c.name = '" + category + "' AND s.name = '" + subcategory + "')");
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
  
  var query = client.query("SELECT * FROM item WHERE description LIKE '%" + desc + "%'"); 
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

module.exports = {
  test: test,
  getItemsByGender: getItemsByGender,
  getItemsByCategory: getItemsByCategory,
  getItemsBySubcategory: getItemsBySubcategory,
  getItemsByDescription: getItemsByDescription,
  getItemsByPrice: getItemsByPrice,
  getItemByItemID: getItemByItemID
};