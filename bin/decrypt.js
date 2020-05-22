const fs = require("fs");
const path = require("path");
const Rx = require("rxjs");

const decrypt = async (keys, msg, openpgp) => {
  const c = JSON.parse(keys);
  if (c.privkey) {
    const privKeyObj = (await openpgp.key.readArmored(c.privkey)).keys[0];
    const armoredMessage = `-----BEGIN PGP MESSAGE-----\r\n\r\n${msg}\r\n-----END PGP MESSAGE-----`;
    const am = await openpgp.message.readArmored(armoredMessage);
    const { data: decrypted } = await openpgp.decrypt({
      message: am, // parse armored message
      privateKeys: [privKeyObj], // for decryption
    });
    console.log(`Message:\n\n${decrypted}`);
  } else {
    console.log("keys do not exist");
  }
};
module.exports = decrypt;
