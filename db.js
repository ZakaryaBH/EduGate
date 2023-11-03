const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbBooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };
