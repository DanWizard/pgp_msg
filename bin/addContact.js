const fs = require("fs");
const path = require("path");

const addContact = ({ name, pubkey }) => {
  let alreadyExists = false;
  fs.access(
    path.join(__dirname, "./contacts.json"),
    fs.constants.F_OK,
    (err) => {
      if (!err) {
        alreadyExists = true;
      }
      if (alreadyExists) {
        console.log("updated contacts");
        fs.readFile(
          path.join(__dirname, "./contacts.json"),
          "utf8",
          (err, fd) => {
            const contacts = JSON.parse(fd);
            contacts[name] = pubkey;
            fs.writeFile(
              path.join(__dirname, "./contacts.json"),
              JSON.stringify(contacts),
              () => {}
            );
          }
        );
      }

      if (!alreadyExists) {
        console.log("contacts created");
        const obj = {};
        obj[name] = pubkey;
        fs.writeFile(
          path.join(__dirname, "./contacts.json"),
          JSON.stringify(obj),
          () => {}
        );
      }
    }
  );
};

module.exports = addContact;
