require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
const { v4: uuidv4 } = require('uuid');
const myLogger = require('./logger/mylogger.log');

// console.log("process", process.env);

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// tracking log
app.use((req, res, next) => {
    const requestId = req.headers['x-request-id'];
    req.requestId = requestId ? requestId : uuidv4();
    myLogger.log(`input params::${req.method}::`, [
        req.path,
        { requestId: req.requestId },
        req.method === 'POST' ? req.body : req.query
    ])
    next();
})


// test pub.sub redis 
// const inventoryTest = require('./tests/inventory.test');
// const productTest = require('./tests/product.test');

// productTest.purchaseProduct('product:001', 10)

// init mongo db
require("./dbs/init.mongodb");

// init mongo redis
const initRedis = require("./dbs/init.redis")
initRedis.initRedis()

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
    const resMessage = `${error.status} - ${Date.now() - error.now}ms - Response: ${JSON.stringify(error)}`
    myLogger.error(resMessage, [
        req.path,
        { requestId: req.requestId },
        {
            message: error.message
        }
    ])
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        // stack: error.stack,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;
