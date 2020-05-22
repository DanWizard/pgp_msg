const fs = require("fs");
const path = require("path");

const deletekeys = (program) => {
  try {
    fs.unlinkSync(path.join(__dirname, "./keys.json"), "utf8", (err, fd) => {
      console.log("deleted");
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = deletekeys;
