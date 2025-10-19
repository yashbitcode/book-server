const { booksTable } = require("../models/index");
const db = require("../db/index");
const { eq, sql } = require("drizzle-orm");

const getAllBooks = async (req, res) => {
    const searchQuery = req.query.search;

    if (searchQuery) {
        const data = await db
            .select()
            .from(booksTable)
            .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${searchQuery})`);
        return res.json(data);
    }

    const data = await db.select().from(booksTable);
    return res.json(data);
};

const getBookById = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await db
            .select()
            .from(booksTable)
            .where(eq(booksTable.id, id));

        return res.json(book);
    } catch {
        return res.status(404).send({
            error: `Book doesn't exist with the id ${id}`,
        });
    }
};

const createBook = async (req, res) => {
    const { title, authorId, description } = req.body;

    try {
        if (!title)
            return res.status(400).json({
                error: "title required",
            });

        const [result] = await db
            .insert(booksTable)
            .values({
                title,
                authorId,
                description,
            })
            .returning({
                id: booksTable.id,
            });

        return res.status(201).json({
            message: "Book created Successfully",
            id: result.id,
        });
    } catch {
        res.status(400).json({
            error: "Author ID not valid",
        });
    }
};

const deleteBookById = async (req, res) => {
    const id = req.params.id;

    try {
        await db.delete(booksTable).where(eq(booksTable.id, id));
        return res.json({ message: "Deletion Successful", id });
    } catch {
        return res.status(404).send({
            error: `Book doesn't exist with the id ${id}`,
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    deleteBookById,
};
