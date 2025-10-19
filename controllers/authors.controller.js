const { authorsTable } = require("../models/index");
const db = require("../db/index");
const { eq, sql } = require("drizzle-orm");

const getAllAuthors = async (req, res) => {
    const searchQuery = req.query.search;

    if (searchQuery) {
        const data = await db
            .select()
            .from(authorsTable)
            .where(
                sql`to_tsvector('english', ${authorsTable.name}) @@ to_tsquery('english', ${searchQuery})`
            );
        return res.json(data);
    }

    const data = await db.select().from(authorsTable);
    return res.json(data);
};

const getAuthorById = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await db
            .select()
            .from(authorsTable)
            .where(eq(authorsTable.id, id));

        return res.json(data);
    } catch {
        return res.status(404).send({
            error: `Author doesn't exist with the id ${id}`,
        });
    }
};

const createAuthor = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const [result] = await db
            .insert(authorsTable)
            .values({
                firstName,
                lastName,
                email,
            })
            .returning({
                id: authorsTable.id,
            });

        return res.status(201).json({
            message: "Author created Successfully",
            id: result.id,
        });
    } catch {
        res.status(400).json({
            error: "Invalid entries or necessary entries missing",
        });
    }
};

const updateAuthor = async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, email } = req.body;

    const obj = {};

    if (firstName) obj.firstName = firstName;
    if (lastName) obj.lastName = lastName;
    if (email) obj.email = email;

    try {
        await db.update(authorsTable).set(obj).where(eq(authorsTable.id, id));
        return res.status(201).json({
            message: "Author updated Successfully",
            id,
        });
    } catch {
        res.json({
            error: "Update failed",
        });
    }
};

const deleteAuthorById = async (req, res) => {
    const id = req.params.id;

    try {
        await db.delete(authorsTable).where(eq(authorsTable.id, id));
        return res.json({ message: "Deletion Successful", id });
    } catch {
        return res.status(404).send({
            error: `Author doesn't exist with the id ${id}`,
        });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthorById,
};
