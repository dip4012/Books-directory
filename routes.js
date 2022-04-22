const express = require("express");
const fs = require("fs");
const router = express.Router();

// get all books
router.get("/books", (req, res) => {
  const jsonData = fs.readFileSync("./books.json");
  res.json(JSON.parse(jsonData));
});

// add a new book
router.post("/book", (req, res) => {
  const existingBooks = JSON.parse(fs.readFileSync("./books.json"));
  const newBookId = Math.floor(100 + Math.random() * 900);
  existingBooks[newBookId] = req.body;
  fs.writeFileSync("./books.json", JSON.stringify(existingBooks));
  res.json({ message: "Book added succesfully" });
});

// get a book by id
router.get("/books/:id", (req, res) => {
  const existingBooks = JSON.parse(fs.readFileSync("./books.json"));
  if (!existingBooks[req.params.id]) res.status(200).json({});
  else res.json(existingBooks[req.params.id]);
});

// update a book
router.put("/books/:id", (req, res) => {
  const existingBooks = JSON.parse(fs.readFileSync("./books.json"));
  existingBooks[req.params.id] = req.body;
  fs.writeFileSync("./books.json", JSON.stringify(existingBooks));
  res.json({ message: `Book with id ${req.params.id} updated` });
});

// delete a book
router.delete("/books/:id", (req, res) => {
  const existingBooks = JSON.parse(fs.readFileSync("./books.json"));
  if (!existingBooks[req.params.id]) {
    res
      .status(400)
      .json({ message: `Book with id ${req.params.id} does not exist` });
  } else {
    delete existingBooks[req.params.id];
    fs.writeFileSync("./books.json", JSON.stringify(existingBooks));
    res.json({ message: `Book with id ${req.params.id} deleted` });
  }
});

module.exports = router;
