const express = require("express");
const router = express.Router();
const BookList = require("../models/dbModel").BookList;
const User = require("../models/dbModel").User;

// Get all the booksList from a specific user
router.get("/", (req, res) => {
  BookList.findAll({ where: { userId: req.user } })
    .then(BookLists => {
      if (BookLists.length != 0) {
        res.status(200).json(BookLists);
      } else {
        res.status(500).send("No data found");
      }
    })
    .catch(err => res.status(500).send(err));
});

// Add a bookList to a user
router.post("/", (req, res) => {
  User.findById(req.user)
    .then(user => {
      if (user) {
        let bookList = req.body;
        bookList.userId = user.id;
        return BookList.create(bookList);
      } else {
        res.status(500).send("User was not found!");
      }
    })
    .then(bookList => res.status(200).json({ id: bookList.id }))
    .catch(err => res.status(500).send(err));
});

// Modify a booklist
router.put("/:bid", (req, res) => {
  BookList.findById(req.params.bid)
    .then(bookList => {
      if (bookList) {
        if (bookList.userId === req.user) {
          bookList.update(req.body);
          res.status(200).send("Booklist modified");
        } else {
          res.status(500).send("Not authorized");
        }
      } else{
        res.status(500).send("Booklist not found");
      }
    })
    .catch(err => res.status(500).send(err));
});

// Delete a booklist
router.delete("/:bid", (req, res) => {
  BookList.findById(req.params.bid)
    .then(bookList => {
      if (bookList) {
        if (bookList.userId === req.user) {
          bookList.destroy();
          res.status(200).send("Booklist deleted");
        } else {
          res.status(500).send("Unauthorized");
        }
      } else {
        res.status(500).send("Booklist not found")
      }
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
