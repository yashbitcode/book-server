const express = require("express");
const { logger } = require("./middlewares/loggerMiddleware");

const bookRouter = require("./routes/books.route");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(logger);

// app.get("/", (req, res) => res.send("Hi Bro!!"));
app.use("/books", bookRouter);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));