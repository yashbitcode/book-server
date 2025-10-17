const express = require("express");
const { books } = require("../mock");

const router = express.Router();

router.get("/", (req, res) => {
    res.json(books);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id))
        return res.status(400).json({
            error: "Id should be a type number",
        });

    const book = books.find((el) => el.id == id);

    if (!book)
        return res.status(404).send({
            error: `Book doesn't exist with the id ${id}`,
        });

    return res.json(book);
});

router.post("/", (req, res) => {
    const { title, author } = req.body;

    if (!title)
        return res.status(400).json({
            error: "title required",
        });

    if (!author)
        return res.status(400).json({
            error: "author required",
        });

    const id = Date.now();

    books.push({
        id,
        title,
        author,
    });

    return res.status(201).json({
        message: "Book created Successfully",
        id,
    });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id))
        return res.status(400).json({
            error: "Id should be a type number",
        });

    const bookIdx = books.findIndex((el) => el.id == id);

    if (bookIdx < 0)
        return res.status(404).send({
            error: `Book doesn't exist with the id ${id}`,
        });

    books.splice(bookIdx, 1);

    return res.json({ message: "Deletion Successful", id });
});

module.exports = router;

// console.log(router.stack);