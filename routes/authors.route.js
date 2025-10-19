const express = require("express");
const router = express.Router();
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthorById,
} = require("../controllers/authors.controller");

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.delete("/:id", deleteAuthorById);

module.exports = router;
