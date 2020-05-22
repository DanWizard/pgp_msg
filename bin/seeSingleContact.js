const path = require("path");
const fs = require("fs");

const seeSingleContact = (data) => {
  fs.readFile(path.join(__dirname, "./contacts.json"), "utf8", (err, fd) => {
    let log = 0;
    const k = JSON.parse(fd);
    Object.entries(k).forEach(([key, value]) => {
      if (data === key) {
        log++;
        console.log(`\n\ncontact name: ${key}\n\ncontact pubkey:\n\n${value}`);
      }
    });

    if (!log) {
      console.log("contact not found with that name");
    }
    // console.log(k);
    // console.log(`\n\n${k.privkey}\n\n${k.pubkey}`);
  });
};

module.exports = seeSingleContact;
