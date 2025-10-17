const fs = require("node:fs");

module.exports.logger = (req, res, next) => {
    const log = `[${Date.now()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync("./log.txt", log, "utf-8");

    next();
};
