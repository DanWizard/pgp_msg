const fs = require("fs");
const path = require("path");

const pubkey = (program) => {
  fs.readFile(path.join(__dirname, "./keys.json"), "utf8", (err, fd) => {
    const k = JSON.parse(fd);
    console.log(`\n\npublic key:\n\n${k.pubkey}`);
  });
};

module.exports = pubkey;
