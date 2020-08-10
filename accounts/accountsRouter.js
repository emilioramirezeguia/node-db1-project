const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

// GET all accounts
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ accounts: accounts });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Create (POST) a new account
router.post("/", (req, res) => {
  const post = req.body;

  db.select("*")
    .from("accounts")
    .insert(post)
    .returning("id")
    .then((ids) => {
      res.status(201).json({ inserted: ids });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
