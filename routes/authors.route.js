const express = require("express");
const router = express.Router();
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthorById,
    updateAuthor,
    getAllAuthorBooks
} = require("../controllers/authors.controller");

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.get("/:id/books", getAllAuthorBooks);

router.post("/", createAuthor);

router.delete("/:id", deleteAuthorById);

router.patch("/:id", updateAuthor);

module.exports = router;
