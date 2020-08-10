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

// Update (PUT) an account by id
router.put("/:id", (req, res) => {
  const postChanges = req.body;
  const postId = req.params.id;

  db.select("*")
    .from("accounts")
    .where({ id: postId })
    .update(postChanges)
    .returning(["id", "name", "budget"])
    .then((count) => {
      res.status(200).json(count);
      //   if (count) {
      //     res.status(200).json({ message: "Updated successfully." });
      //   } else {
      //     res.status(400).json({ message: "Account not found." });
      //   }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// DELETE an account by id
router.delete("/:id", (req, res) => {
  const postId = req.params.id;

  db.select("*")
    .from("accounts")
    .where({ id: postId })
    .del()
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "Removed successfully." });
      } else {
        res.status(404).json({ message: "Not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
