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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    chooseMenu();
});

function chooseMenu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Please select a menu option?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            // console.log(answer);
            switch (answer.menu) {
                case "View Products for Sale":
                    displayItemsForSale();
                    break;

                case "View Low Inventory":
                    displayLowInventory();
                    break;

                case "Add to Inventory":
                    displayItemsForSale(addToInvetory);
                    break;

                case "Add New Product":
                    askQuestions();
                    break;
            }
        })
}

function displayItemsForSale(func) {
    connection.query("SELECT item_id, product_name, price, stock_quantity, department_name FROM products WHERE price > 0;", function (err, result) {
        if (err) throw err;

        var obj = result[0];
        var header = [];
        for (var prop in obj) {
            header.push(prop);
        }

        // instantiate 
        var table = new Table({
            head: header,
            colWidths: [15, 55, 10, 10, 20]
        });

        var item_ids = [];
        for (var i = 0; i < result.length; i++) {
            item_ids.push(result[i].item_id);
            table.push([result[i].item_id, wrap(result[i].product_name), result[i].price, result[i].stock_quantity, result[i].department_name]);
        }
        var output = table.toString();
        console.log(output);
        if (func) {
            func(item_ids);
        } else {
            connection.end();
        }
    });
}

function displayLowInventory() {
    connection.query("SELECT item_id, stock_quantity FROM products WHERE stock_quantity <= 5;", function (err, result) {
        console.log(err)
        var obj = result[0];
        var header = [];
        for (var prop in obj) {
            header.push(prop);
        }

        // instantiate 
        var table = new Table({
            head: header,
            colWidths: [15, 10]
        });

        for (var i = 0; i < result.length; i++) {
            table.push([result[i].item_id, result[i].stock_quantity]);
        }
        var output = table.toString();
        console.log(output);
        connection.end();
    });

}


function addToInvetory(list) {
    inquirer
        .prompt([{
            name: "action",
            type: "list",
            message: "Select item:",
            choices: list
        },
        {
            name: "quantity",
            type: "input",
            message: `Update quantity with:`,
        }])
        .then(function (answer) {
            updateQuantity(answer.action, answer.quantity);
        })
}

function updateQuantity(item, quant) {
    var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?"
    connection.query(
        query,
        [
            quant,
            {
                item_id: item
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log('DB has been updated!'.green);
            connection.end();
        }
    );
}

function askQuestions() {
    inquirer
        .prompt([{
            name: "id",
            message: "Input Item ID: "
        },
        {
            name: "name",
            message: "Input Product Name: "
        },
        {
            name: "department",
            type: "list",
            message: "Select Department",
            choices: ["Electronics", "Books", "Clothing", "Shoes", "Handmade"]
        },
        {
            name: "price",
            message: "Input Product Cost: "
        },
        {
            name: "stock",
            message: "Input Stock Quantity: "
        }])
        .then(function (answer) {
            addNewItem(answer.id, answer.name, answer.department, answer.price, answer.stock);
        });
}

function addNewItem(id, name, department, price, stock) {
    var query = "INSERT INTO products SET ?"
    connection.query(query,
        {
            item_id: id,
            product_name: name,
            department_name: department,
            price: price,
            stock_quantity: stock
        },
        function (err, res) {
            if (err) console.log(err)
            console.log(`New item ${id} is added to DB!`.green);
            connection.end();
        }
    )
}

