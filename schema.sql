CREATE TABLE category (
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
);
