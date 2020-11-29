const router = require("express").Router();
const db = require("../models");

// Search all books.
router.get("/books", (req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  db.Book.find({
    title: { $regex: new RegExp(req.query.q, 'i')}
  })
    .then(books => res.json(books))
    .catch(err => res.status(422).json(err));
});

// Get 1 book by id
router.get("/book/:id", (req, res) => {
  db.Book
    .findById(req.params.id)
    .then((book) => res.json(book))
    .catch(err => res.status(422).json(err));
}),

// Add new book to DB
router.post("/book", (req, res) => {
  db.Book
    .create(req.body)
    .then((book) => res.json(book))
    .catch(err => res.status(422).json(err));
});

// Update book by id.
router.put("/book/:id", (req, res) => {
  db.Book
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((book) => res.json(book))
    .catch((err) => res.status(422).json(err));
});

// Delete book by id.
router.delete("/book/:id", (req, res) => {
  db.Book
    .findOneAndDelete({ _id: req.params.id })
    .then((book) => res.json(book))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;