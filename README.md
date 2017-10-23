# Amazon-like Storefront MySQL

## Overview

Amazon-like storefront application is a node.js/MySQL application built to take in orders from customers and deplete stock from the store's inventory. The app can also look for low inventory, add inventory and add new product to the database. The app allows the user to have a Customer View and a Manager View.

## How it works

### Demo:
    * Customer View
    [![CODING IS FUN](https://i.ytimg.com/vi/1N0joc9_p-c/2.jpg?time=1508793833926)](https://www.youtube.com/watch?v=1N0joc9_p-c)
    * Manager View:

### Installing dependecies

The app uses the following dependencies:
        * `mysql`
        * `word-wrap`
        * `cli-table`
        * `inquirer`
        * `colors`

### Running the app

Open a terminal window and run the following code:

* For Customer View:  `node bamazonCustomer.js`
    * customers can buy products from the store and calculates the total cost.
    * based on the the quanity purchased the database will be updated, depleting the stock.

* For Manager View:  `node bamazonManager.js`
    * managers are able to choose from the following menu options:
        * View Products for Sale: - the app lists every available item: the item IDs, names, prices, and quantities.
        * View Low Inventory: - the app lists all items with an inventory count lower than five.
        * Add to Inventory: - the app displays a prompt that will let the manager "add more" of any item currently in the store.
        * Add New Product: - the app allows the manager to add a completely new product to the store.


