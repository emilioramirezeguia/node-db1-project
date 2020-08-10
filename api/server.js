const express = require("express");
const db = require("../data/dbConfig.js");
const server = express();
const accountsRouter = require("../accounts/accountsRouter");
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's working... it's working!" });
});

server.use("/accounts", accountsRouter);

module.exports = server;
