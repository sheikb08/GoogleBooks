const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({

  bookId: {
    type: String,
    default: ""
  },
  selfLink: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ""
  },
  authors: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    default: ""
  },
  publisher: {
    type: String,
    default: ""
  },
  publishedDate: {
    type: String,
    default: ""
  },
  previewLink: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  read: {
    type: Boolean,
    default: false
  },
  key: {
    type: String,
    unique: true
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;