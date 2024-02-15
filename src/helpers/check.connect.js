"use strict";

// count connect
const mongoose = require("mongoose");
const process = require("process");
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections:: ${{ numConnection }}`);
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numberConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // Examples maximum number of connections based on number osf cores
    const maxConnections = numCores * 5;
    console.log(`Active connections: ${numberConnection}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024}`);

    if (numberConnection > maxConnections) {
      console.log(`Connection overload detected`);
      // notify.send(...)
    }
  }, 5000);
};

module.exports = {
  countConnect,
  checkOverload,
};
