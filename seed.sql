DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id VARCHAR(30) NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  department_name VARCHAR(100) NULL,  
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

-- Creates new rows
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES("TCL 32S305", "32-Inch 720p Roku Smart LED TV", "Electronics", 169.99, 10),
("MEER 1600", "Video Projector, MEER 1600 Lumens 13inch Wide Screen LED Portable Projector with Built-in Speaker", "Electronics", 89.99, 5),
("SUP NI2000", "Super Mario Odyssey - Nintendo Switch", "Electronics", 59.99, 10),
("Dell i3265-A643WHT-PUS", "Inspiron 3265 AIO Desktop", "Electronics", 429.99, 6),
("MOUSE 3509", "TopMate Ultra Slim Portable Mute Wireless Keyboard and Mouse Combo, Office Wireless USB Mouse", "Electronics", 29.99, 15),
("DREAM 089", "Women's Fashion Casual Outdoor Low Wedge Heel Booties Shoes", "Shoes", 25.89, 2),
("POUL SWT 2300", "Poulax Womens Cotton Knitted Long Sleeve Lightweight Tunic Sweatshirt Tops", "Clothing", 18.99, 10),
("HAN 3PCCW", "Pillow Cover - Cuddle Weather, home decor, present, housewarming gift, throw pillow", "Handmade", 15, 0),
("BOO HWN", "History of Wolves: A Novel", "Books", 18.56, 0),
("BOO HP12", "Harry Potter and the Cursed Child, Parts 1 & 2", "Books", 14.99, 10);

