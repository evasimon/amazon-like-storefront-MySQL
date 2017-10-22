DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id VARCHAR(30) NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  department_name VARCHAR(100) NULL,  
  price DECIMAL(10,2) NOT NULL,
  stock_quantity DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

-- products data are imported from products_table_data.csv file
-- Creates new rows
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("CAMERA 27LCD", "HD Mini Digital Camera with 2.7 Inch TFT LCD Display", "Electronics", 49.99, 0);

SELECT item_id, product_name, price
FROM products
WHERE price > 0;

SELECT item_id, stock_quantity, price
FROM products
WHERE item_id = [ ... ];

