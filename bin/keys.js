const fs = require("fs");
const path = require("path");

const keys = (program) => {
  fs.readFile(path.join(__dirname, "./keys.json"), "utf8", (err, fd) => {
    const k = JSON.parse(fd);
    console.log(`\n\n${k.privkey}\n\n${k.pubkey}`);
  });
};

module.exports = keys;
