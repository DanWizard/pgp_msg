const fs = require("fs");
const path = require("path");

const newKeys = (program, openpgp, cb) => {
  var options = {
    userIds: [{ name: "piss man", email: "fuck@shit.com" }], // multiple user IDs
    numBits: 4096, // RSA key size
    // passphrase: program.passphrase, // protects the private key
  };
  try {
    openpgp.generateKey(options).then(function (key) {
      var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
      var pubkey = key.publicKeyArmored; // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

      let alreadyExists = false;
      try {
        fs.access(
          path.join(__dirname, "./keys.json"),
          fs.constants.F_OK,
          (err) => {
            if (!err) {
              alreadyExists = true;
              console.log("keys already generated");
            }
            if (!alreadyExists) {
              console.log("keys created");
              try {
                fs.writeFile(
                  path.join(__dirname, "./keys.json"),
                  JSON.stringify({ privkey, pubkey }),
                  (err, fd) => {
                    if (err) {
                      if (err.code === "EEXIST") {
                        return;
                      }

                      throw err;
                    }
                    cb();
                  }
                );
              } catch (e) {
                console.log(e);
              }
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = newKeys;
