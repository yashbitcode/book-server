const express = require("express");
const {
    getAllBooks,
    getBookById,
    createBook,
    deleteBookById,
    updateBook
} = require("../controllers/books.controller");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.delete("/:id", deleteBookById);

router.patch("/:id", updateBook);

module.exports = router;
