const path = require("path");
const fs = require("fs");

const seeAllContacts = () => {
  fs.readFile(path.join(__dirname, "./contacts.json"), "utf8", (err, fd) => {
    const k = JSON.parse(fd);
    Object.keys(k).forEach((key) => {
      console.log(key);
    });
    // console.log(k);
    // console.log(`\n\n${k.privkey}\n\n${k.pubkey}`);
  });
};

module.exports = seeAllContacts;
