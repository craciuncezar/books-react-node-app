const express = require("express");
const router = express.Router();
const { BookList, Book, BookList_Book } = require("../models/dbModel");

// Add a book to a booklist
router.post("/:lid", (req, res) => {
  let booklist;
  BookList.findById(req.params.lid)
    .then(bookList => {
      if (bookList) {
        if (bookList.userId === req.user) {
          booklist = bookList;
          return Book.findOne({ where: { title: req.body.title } });
        } else {
          res.status(500).send("Not authorized");
          return Promise.reject();
        }
      } else {
        res.status(500).send("No booklist found");
        return Promise.reject();
      }
    })
    .then(book => {
      if (!book) {
        return Book.create(req.body);
      } else {
        booklist.addBook(book);
        res.status(200).json({ id: book.id });
        return Promise.reject();
      }
    })
    .then(book => {
      booklist.addBook(book);
      res.status(200).json({ id: book.id });
    })
    .catch(err => res.status(500).send(err));
});

// Get books from a booklist
router.get("/:lid", (req, res) => {
  BookList.findById(req.params.lid)
    .then(bookList => {
      if (bookList) {
        if (bookList.userId === req.user) {
          return bookList.getBooks();
        } else {
          res.status(500).send("Unauthorized");
        }
      } else {
        res.status(500).send("BookList not found");
      }
    })
    .then(books => res.status(200).send(books))
    .catch(err => res.status(500).send(err));
});

// Delete a book from a booklist
router.delete("/:lid/:bid", (req, res) => {
  BookList.findById(req.params.lid)
    .then(bookList => {
      if (bookList) {
        if (bookList.userId === req.user) {
          return BookList_Book.destroy({
            where: { bookListId: req.params.lid, bookId: req.params.bid }
          });
        } else {
          res.status(500).send("Not authorized");
          return Promise.reject();
        }
      } else {
        res.status(500).send("Booklist doesnt exist");
      }
    })
    .then(books => {
      if (books) {
        res.status(200).send("Book deleted");
      } else {
        res.status(500).send("Book not found");
      }
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
