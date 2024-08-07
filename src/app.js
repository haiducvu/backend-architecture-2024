require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();

// console.log("process", process.env);

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// test pub.sub redis 
// const inventoryTest = require('./tests/inventory.test');
// const productTest = require('./tests/product.test');

// productTest.purchaseProduct('product:001', 10)

// init db
require("./dbs/init.mongodb");
// init mysql
require("./dbs/init.mysql");
// init routes
app.use('/', require('./routes'))

// handle errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404,
        next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        // stack: error.stack,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;
