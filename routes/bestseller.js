const express = require("express");
const router = express.Router();
const { BestSellerLists, Book, Bestseller_Book } = require("../models/dbModel");
const axios = require("axios");
const { nyTimesKey, googleKey } = require("../config");

let lists = ["science", "hardcover-fiction", "hardcover-nonfiction"];

// SEND ALL BESTSELLERS FROM THE DB
router.get("/", (req, res) => {
  BestSellerLists.findAll({ include: Book })
    .then(bestSellerLists => {
      if (bestSellerLists) {
        res.status(200).send(bestSellerLists);
      } else {
        res.status(400).send("No list found");
      }
    })
    .catch(err => res.status(500).send(err));
});

function getBestSellerList() {
  var bookLists = [];
  let promises = lists.map(el => {
    return axios
      .get("https://api.nytimes.com/svc/books/v3/lists.json", {
        params: {
          "api-key": nyTimesKey,
          list: el
        }
      })
      .then(response => {
        let newBooksLists = {};
        newBooksLists.name = el;
        newBooksLists.books = response.data.results;
        newBooksLists.books.length = 4;
        newBooksLists.books.image = "";
        bookLists.push(newBooksLists);
      })
      .catch(err => console.log(err));
  });

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(() => {
        for (let booklist of bookLists) {
          booklist.books = booklist.books
            .map(({ book_details }) => book_details)
            .reduce((a, b) => a.concat(b), []);
        }
        return getBooksImages(bookLists);
      })
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function getBooksImages(bookLists) {
  let promises = bookLists.map(el => {
    let promise = el.books.map(book => {
      return axios
        .get("https://www.googleapis.com/books/v1/volumes", {
          params: {
            q: `isbn:${book.primary_isbn10}`,
            key: googleKey
          }
        })
        .then(response => {
          if (response.data.items) {
            let img = response.data.items[0].volumeInfo.imageLinks.thumbnail;
            img = img.replace(/^http:\/\//i, "https://");
            book.image = img;
          }
        })
        .catch(err => console.log(err));
    });
    return promise;
  });

  promises = promises.reduce((a, b) => a.concat(b), []);
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(() => {
        return resolve(bookLists);
      })
      .catch(e => reject(e));
  });
}

function dropBestSellerDB() {
  return new Promise((resolve, reject) => {
    BestSellerLists.destroy({
      where: {}
    })
      .then(() => {
        Bestseller_Book.destroy({
          where: {}
        }).then(r => resolve(r));
      })
      .catch(r => reject(r));
  });
}

function createBestSellersDB(bookLists) {
  for (let list of bookLists) {
    BestSellerLists.create({ name: list.name }).then(newList => {
      for (let book of list.books) {
        let { title, author, description, image } = book;
        let newBook = {
          title,
          author,
          description,
          imgUrl:
            image ||
            "https://www.chindi-authors.co.uk/wp-content/uploads/2017/02/book-cover-placeholder.jpg"
        };
        Book.create(newBook).then(r => {
          newList.addBook(r);
        });
      }
    });
  }
}

// METHOD TO UPDATE THE LOCAL DB WITH NEW DATA FROM NYT API
function updateBestSellersDB() {
  dropBestSellerDB()
    .then(() => getBestSellerList())
    .then(list => createBestSellersDB(list))
    .catch(e => console.log(e));
}

module.exports = { router, updateBestSellersDB };
