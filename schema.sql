CREATE TABLE customer (
	CustomerID SERIAL PRIMARY KEY,
	FirstName varchar(255),
	LastName varchar(255),
	AccessToken varchar(255) NOT NULL,
	Address varchar(255),
	Email varchar(255) NOT NULL,
	Password varchar(255)
);

CREATE TABLE category (
	CategoryID SERIAL PRIMARY KEY,
	Name varchar(55) NOT NULL,
	Gender char NOT NULL
);

CREATE TABLE subcategory (
	SubCategoryID SERIAL PRIMARY KEY,
	Name varchar(255) NOT NULL,
	CategoryID integer NOT NULL REFERENCES category
);

CREATE TABLE item (
	ItemID SERIAL PRIMARY KEY,
	Name varchar(255) NOT NULL,
	Description varchar(1000),
	Price Numeric(12,2) NOT NULL,
	ImageSource varchar(255),
	SubCategoryID integer NOT NULL REFERENCES subcategory
);

CREATE TABLE purchase (
	PurchaseID SERIAL PRIMARY KEY,
	CustomerID integer NOT NULL REFERENCES customer
);

CREATE TABLE purchasedetails (
	PurchaseDetailsID SERIAL PRIMARY KEY,
	PurchaseID integer NOT NULL REFERENCES purchase,
	ItemID integer NOT NULL REFERENCES item,
	Quantity integer NOT NULL
);

INSERT INTO category (Name, Gender) VALUES ('Tops', 'M');
INSERT INTO category (Name, Gender) VALUES ('Bottoms', 'M');
INSERT INTO category (Name, Gender) VALUES ('Tops', 'F');
INSERT INTO category (Name, Gender) VALUES ('Bottoms', 'F');
INSERT INTO category (Name, Gender) VALUES ('Dresses', 'F');

INSERT INTO subcategory(Name, CategoryID) VALUES ('Shirts', 1);
INSERT INTO subcategory(Name, CategoryID) VALUES ('T-Shirts', 1);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Jackets', 1);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Jeans', 2);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Shorts', 2);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Socks', 2);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Shoes', 2);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Sleepwear', 2);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Shirts', 3);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Long Sleeve', 3);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Jumper', 3);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Jackets', 3);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Intimates', 3);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Jeans', 4);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Shorts', 4);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Skirts', 4);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Shoes', 4);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Socks', 4);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Sleepwear', 4);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Midi', 5);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Mini', 5);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Maxi', 5);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Sandals', 5);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Office Wear', 5);
INSERT INTO subcategory(Name, CategoryID) VALUES ('Artificial Jewllery', 5);

INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Volcom Polo Shirt', 'Volcom Polo Shirt\nSize: Medium\n Color:White', 39.99, 1);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Volcom Polo Shirt', 'Volcom Polo Shirt\nSize: Large\n Color:White', 39.99, 1);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Volcom Polo Shirt', 'Volcom Polo Shirt\nSize: Large\n Color:Blue', 39.99, 1);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Federation Short Sleeve Shirt', 'Federation Short Sleeve Shirt\nSize: Large\n Color:Black', 59.99, 1);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Federation Short Sleeve Shirt', 'Federation Short Sleeve Shirt\nSize: Small\n Color:Black', 59.99, 1);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Quicksilver T-Shirt', 'Quicksilver T-Shirt\nSize: Large\n Color:Black', 34.99, 2);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Stussy T-Shirt', 'Stussy T-Shirt\nSize: Large\n Color:Black', 34.99, 2);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('DC Jacket', 'DC Jacket\nSize: Medium\n Color:Blue', 94.99, 3);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('DC Jacket', 'DC Jacket\nSize: Small\n Color:Black', 94.99, 3);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Volcom Puffer Vest', 'Volcom Puffer Vest\nSize: Small\n Color:Black', 104.99, 3);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Federation Skinny Jeans', 'Federation Skinny Jeans\nSize: 32\n Color:White', 129.99, 4);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('Federation Skinny Jeans', 'Federation Skinny Jeans\nSize: 30\n Color:White', 129.99, 4);
INSERT INTO item( Name, Description, Price, SubCategoryID) VALUES ('ABrand Slim Fit Jeans', 'ABrand Slim Fit Jeans\nSize: 32\n Color:Black', 139.99, 4);

INSERT INTO customer(AccessToken, Email) VALUES (1, 'test@gmail.com');
INSERT INTO customer(AccessToken, Email) VALUES (2, 'guest@gmail.com');

INSERT INTO purchase(CustomerID) VALUES (1);
INSERT INTO purchase(CustomerID) VALUES (2);

INSERT INTO purchasedetails(PurchaseID, ItemID, Quantity) VALUES (1, 1, 2);
INSERT INTO purchasedetails(PurchaseID, ItemID, Quantity) VALUES (1, 11, 1);
INSERT INTO purchasedetails(PurchaseID, ItemID, Quantity) VALUES (1, 13, 1);
INSERT INTO purchasedetails(PurchaseID, ItemID, Quantity) VALUES (2, 5, 1);

