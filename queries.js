var pg = require('pg');

var connectionString = 'postgres://lewiskier:nwen304databasepass@depot:5432/lewiskier_jdbc';
//var connectionString = 'postgres://monaruan:urban@localhost:5432/urban_apparel';
// var connectionString = 'postgres://monaruan:urban@localhost:5432/urban_apparel';
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
	const queryText = "SELECT * FROM item WHERE subcategoryid IN " + 
							"(SELECT s.SubCategoryID FROM subcategory s " + 
							"INNER JOIN category c ON s.CategoryID = c.CategoryID " +
							"WHERE c.gender = $1)";
	const values = [req.params.gender];
    
   client = new pg.Client(connectionString);
   client.connect();

   var query = client.query(queryText, values);
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
	const queryText = "SELECT * FROM item WHERE subcategoryid IN " + 
							"(SELECT s.SubCategoryID FROM subcategory s " + 
							"INNER JOIN category c ON s.CategoryID = c.CategoryID " +
							"WHERE c.gender = $1 AND c.name = $2)";
	const values = [req.params.gender, req.params.category];	

   client = new pg.Client(connectionString);
   client.connect();

   var query = client.query(queryText, values);
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

function getItemsBySubcategory(req, res, next) {
   const queryText = "SELECT * FROM item WHERE subcategoryid IN " + 
							"(SELECT s.SubCategoryID FROM subcategory s " + 
							"INNER JOIN category c ON s.CategoryID = c.CategoryID " +
							"WHERE c.gender = $1 AND c.name = $2 AND s.name = $3)";
	const values = [req.params.gender, req.params.category, req.params.subcategory];		
	
   client = new pg.Client(connectionString);
   client.connect();

   var query = client.query(queryText, values);
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

function getItemsByDescription(req, res, next){
	const queryText = "SELECT * FROM item " +
							"WHERE LOWER(description) LIKE LOWER($1)";
	const values = ["%"+req.params.desc+"%"];
		
   client = new pg.Client(connectionString);
   client.connect();

   var query = client.query(queryText, values);
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

function getItemsByPrice(req, res, next) {
	const queryText = "SELECT * FROM item " +
							"WHERE price BETWEEN $1 AND $2";
	const values = [req.params.minPrice, req.params.maxPrice]	;

   client = new pg.Client(connectionString);
   client.connect();

   var query = client.query(queryText, values);
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

function getItemByItemID(req, res, next) {
	const queryText = "SELECT * FROM item " + 
							"WHERE itemID = $1";
   const values = [parseInt(req.params.itemID)];

   client = new pg.Client(connectionString);
   client.connect();

   var query = client.query(queryText, values);
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

function getKart(req, res, next) {
	const queryText = "SELECT itemid, quantity FROM purchasedetails pd " +
							"INNER JOIN purchase p ON p.purchaseid = pd.purchaseid " +
							"WHERE customerID = $1";
	const values = [parseInt(req.params.customerID)];	
	
  	client = new pg.Client(connectionString);
   client.connect();
  
   var query = client.query(queryText, values);   
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

function removeItemFromKart(req, res, next) {
	const queryText = "DELETE FROM purchasedetails pd " +
							"WHERE itemid = $1 AND purchaseid IN " +
							"(SELECT purchaseid FROM purchase " +
							"WHERE customerID = $2)"
	const values = [parseInt(req.params.itemID), parseInt(req.params.customerID)];	

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
   	 	message: "Removed item from kart" 
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

/*
function updateUser(req, res, next) {   
   
  	client = new pg.Client(connectionString);
  	client.connect();
  
  	var query = client.query("");

  	query.on('end', function() {
    	client.end();
    	res.json({
    		status: "success",
    		//message: "Updated user " + itemID + " to kart" 
    	});
  	});
}*/

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
    addItemToKart: addItemToKart
};