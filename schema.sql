/*CREATE TABLE category (
	CategoryID integer(12) NOT NULL,
	Name varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (CategoryID)
);

CREATE TABLE item (
	ItemID integer(12) NOT NULL,
	Name varchar(255) NOT NULL,
	Description varchar(1000),
	Price integer NOT NULL,
	ImageSource varchar(255),
	Category integer(12) NOT NULL,
	PRIMARY KEY (ItemID),
	FOREIGN KEY (Category) References category(Name)
);

CREATE TABLE customer (
	CustomerID integer(12) NOT NULL,
	Name varchar(255) NOT NULL,
	Address varchar(255) NOT NULL,
	Email varchar(255) NOT NULL,
	Password varchar(255) NOT NULL,
	PRIMARY KEY (CustomerID)
);

CREATE TABLE order (
	OrderID integer(12) NOT NULL,
	OrderDate date NOT NULL,
	CustomerID integer(12) NOT NULL,
	TotalPrice integer NOT NULL,
	PRIMARY KEY (OrderID),
	FOREIGN KEY (CustomerID) References customer(CustomerID)
);

CREATE TABLE order_item (
	OrderItemsID integer(12) NOT NULL
	OrderID integer(12) NOT NULL,
	ItemID integer(12) NOT NULL,
	Quantity integer NOT NULL,
	PRIMARY KEY (OrderItemsID),
	FOREIGN KEY OrderID References order(OrderID),
	FOREIGN KEY ItemID References item(ItemID)
);*/

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
	Price money NOT NULL,
	ImageSource varchar(255),
	CategoryID integer NOT NULL REFERENCES category,
);	

CREATE TABLE order (
	OrderID SERIAL PRIMARY KEY,
	Date date NOT NULL,
	Email varchar(255),
);

CREATE TABLE orderdetails (
	OrderDetailsID SERIAL PRIMARY KEY,
	OrderID integer NOT NULL REFERENCES order,
	ItemID integer NOT NULL REFERENCES item,
	Quantity integer NOT NULL 
);




















