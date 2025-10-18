const express = require("express");
const { logger } = require("./middlewares/loggerMiddleware");

const bookRouter = require("./routes/books.route");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(logger);

// app.get("/", (req, res) => res.send("Hi Bro!!"));
// app.use("/books", bookRouter);

app.use((req, res, next) => {
    req.time = Date.now();
    next();
});

app.get("/", (req, res, next) => {
    req.val = 1221;
    next();
}, (req, res, next) => {
    console.log(`${req.time}, ${req.val}`);
    next();
});

app.get("/", (req, res) => res.send("hi"));


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));