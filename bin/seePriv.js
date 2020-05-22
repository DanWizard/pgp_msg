const fs = require("fs");
const path = require("path");

const privkey = (program) => {
  fs.readFile(path.join(__dirname, "./keys.json"), "utf8", (err, fd) => {
    const k = JSON.parse(fd);
    console.log(`\n\nprivate key:\n\n${k.privkey}`);
  });
};

module.exports = privkey;
