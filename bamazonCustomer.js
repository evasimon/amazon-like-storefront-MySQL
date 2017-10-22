var mysql = require('mysql');
var wrap = require('word-wrap');
var Table = require('cli-table');
var inquirer = require('inquirer');
var colors = require('colors');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // sets username
  user: "root",
  // sets password
  password: "",
  // sets current database
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId);
  itemsForSale();
});

// A query which returns all items available for sale ().
function itemsForSale() {
    connection.query("SELECT item_id, product_name, price, department_name FROM products WHERE price > 0;", function(err, result) {
        var obj = result[0];
        var header = [];
        for (var prop in obj) {
            header.push(prop);
        }

        // instantiate 
        var table = new Table({
            head: header,
            colWidths: [15, 55, 10, 20]
        });

        var values = [];
        var item_ids = [];
        for (var i = 0; i < result.length; i++) {
            item_ids.push(result[i].item_id);
            table.push([result[i].item_id, wrap(result[i].product_name), result[i].price, result[i].department_name]);
        }
        var output = table.toString();
        console.log(output);
        purchaseItem(item_ids);
    });
  }

function purchaseItem(list) {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please indicate which item would you like to purchase?",
            choices: list
        })
        .then(function(answer) {
            var query = "SELECT item_id, stock_quantity, price FROM products WHERE ?";
            connection.query(query, {item_id: answer.action}, function(err, res) {
                // console.log(res);
                checkStock(res[0].stock_quantity, res[0].price, res[0].item_id);
            });
        })
}

function checkStock(on_stock, price, item) {
    inquirer
        .prompt({
            name: "item",
            type: "input",
            message: "Please enter quantity?",
        })
        .then(function(answer) {
            if (on_stock > answer.item) {
                var total_price =  answer.item * price;
                console.log(`Your total amount is $${total_price}.\nThank you for your purchase on BAMAZON!`.green);
                updateStock(answer.item, on_stock, item);
            } else {
                console.log(`Insufficient quantity on stock!\nOnly ${on_stock} items on stock!`.red);
                connection.end();
            }
        })
}


function updateStock(quantity, stock_q, item){
    var updating_stock = stock_q - quantity;
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(
        query,
        [
          {
            stock_quantity: updating_stock
          },
          {
            item_id: item
          }
        ],
        function(error) {
          if (error) throw error;
          console.log("DB was succefully updated!");
        connection.end();
    });
}


  