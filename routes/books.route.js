const express = require("express");
const {
    getAllBooks,
    getBookById,
    createBook,
    deleteBookById
} = require("../controllers/books.controller");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.delete("/:id", deleteBookById);

module.exports = router;

// console.log(router.stack);