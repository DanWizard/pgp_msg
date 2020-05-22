const fs = require("fs");
const path = require("path");

const encrypt = ({ receiver, msg, openpgp }) => {
  fs.readFile(
    path.join(__dirname, "./contacts.json"),
    "utf8",
    async (err, fd) => {
      const c = JSON.parse(fd);
      if (c[receiver]) {
        const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----\r\n\r\n${c[receiver]}\r\n-----END PGP PUBLIC KEY BLOCK-----`;
        const keys = await openpgp.key.readArmored(publicKeyArmored);
        const { data: encrypted } = await openpgp.encrypt({
          message: openpgp.message.fromText(msg), // input as Message object
          publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
        });
        console.log(`Message:\n\n${encrypted}`);
      } else {
        console.log("contact does not exist");
      }
    }
  );
};

// -----BEGIN PGP MESSAGE-----
// Version: OpenPGP.js v4.10.1
// Comment: https://openpgpjs.org

// wcFMA7SgHsucdhS5AQ//ckrY1Rd+AkMbxjKrmbyXG2/E1Sw2RBtKLmjHtc8D
// S6dKg+21O4UbjpQPieEg1Qx9d8QRj/ya9PI1cgzfk4HmD5vbQdMnojz6kmYq
// LGNgJZNmDxyu/wKAwa6Ik+kniE6RwXXzLvfeD44gXO7PXiC8H2iiCWqo6S06
// DjfD0wRJ5maEUJnBccOFcZqdbL3zcajiqsoRXxe1rCoTcVMD8oaHaZpYCaz3
// j7WQjax5yZGpKnWlCdw5WtW2aWX55Kq10oZHnIPbx8OZo4O0uPKxqtfg38M5
// 1WqK3K1lCKmcRn/4MIcojJ4lwmrJ6QyPhX8YrIFgZxqa1xNZqrMq19inxVbx
// uwq3hejRgHz7/dgjz4jTqiJqXhD8qz3sqOK5Lnn2K8kFXeXY3pbRAF6oqqv8
// QXEigaZUdAyIvyMovEnJoLcK7dl3MPEcOaQJld5RvC51jsYg7VRUwYq4ZeUT
// kA1J2e8HneWnCilBpSMDqXKCUl3qKy4CnmgVflS2v1WezxXbQFUT2ECv75Gj
// 77nWZ5kEbu6Uni8fdByD19IspSaXtOA2PlZlU9Qp5s6oldJnffUvPr2/V4Wi
// Gtw4DbgraY+pQdhJ1Mwk0OqqN3NtKUkM+Fz7q3riVxtEYycCjd8tx6Co60w1
// MbxrESfS/gKInp75VWyOoRihomEM8ERkf+fRbI+fKa/SOwGavCc4pT7SwtCk
// uFmsmCQ62tH+3kIGLeLcIUDNsUk5mCbm+vBQVXh7FNx3Ggg7ZuR5a2o86TE3
// 596e
// =BYIk
// -----END PGP MESSAGE-----

module.exports = encrypt;
