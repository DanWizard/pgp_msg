#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const program = require("commander"); // (normal include)
const newKeys = require("./newKey");
const keys = require("./keys");
const decrypt = require("./decrypt");
const addContact = require("./addContact");
const encrypt = require("./encrypt");
const seeContacts = require("./seeContact");
const seeSingleContact = require("./seeSingleContact");
const seePriv = require("./seePriv");
const deleteKeys = require("./deleteKeys");
const seePub = require("./seePub");
const inquirer = require("inquirer");
const openpgp = require("openpgp"); // use as CommonJS, AMD, ES6 module or via window.openpgp
openpgp.initWorker({ path: "openpgp.worker.js" }); // set the relative web worker path
const vorpal = require("vorpal")();
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

openpgp.config.ignore_mdc_error = true;

const exe = () => {
  vorpal.delimiter("shhhh$ >>").show();

  vorpal
    .command("nk", "generates new keys")
    .option("-p, --passphrase <passphrase>", "passphrase")
    .types({
      string: ["p", "passphrase"],
    })
    .action((args, cb) => {
      // console.log(args);
      newKeys(args, openpgp, cb);
      try {
        // cb();
      } catch (e) {
        console.log(e);
      }
    });

  vorpal.command("dk", "generates new keys").action((args, cb) => {
    deleteKeys();
    cb();
  });

  vorpal
    .command("k", "see keys")
    .option("-o, --seeKey <key>", "message destination")
    .types({
      string: ["o", "seeKey"],
    })
    .action((args, cb) => {
      console.log(args);
      if (args.options.seeKey === "public") {
        seePub();
      }
      if (args.options.seeKey === "private") {
        seePriv();
      } else if (!args.options.seeKey) {
        keys();
      }

      cb();
    });

  vorpal.command("decrypt", "decrypt message").action((args, cb) => {
    shell.touch("msg.txt");
    console.log("\n\nenter message in txt then save and exit");
    shell.exec("msg.txt");
    fs.readFile(path.join(__dirname, "./msg.txt"), "utf8", (err, fd) => {
      fs.readFile(path.join(__dirname, "keys.json"), "utf8", (err, efd) => {
        decrypt(efd, fd, openpgp);
      });
    });
    shell.rm("msg.txt");
    cb();
  });

  vorpal
    .command("encrypt", "encrypt message")
    .option("-r, --receiver <receiver>", " message destination")
    .types({
      string: ["r", "receiver"],
    })
    .option("-m, --msg <msg>", "message to encrypt")
    .types({
      string: ["m", "--msg"],
    })
    .action((args, cb) => {
      console.log(args);
      encrypt({ ...args.options, openpgp });
      cb();
    });

  vorpal
    .command("ac", "add contact")
    .option("-n, --name <name>", "name of contact")
    .types({
      string: ["n", "name"],
    })
    .action((args, cb) => {
      console.log(args);
      if (args.options.name) {
        shell.touch("pubkey.txt");
        console.log("\n\nenter pubkey in txt");
        shell.exec("pubkey.txt");
        fs.readFile(path.join(__dirname, "./pubkey.txt"), "utf8", (err, fd) => {
          addContact({ ...args.options, pubkey: fd, openpgp });
        });
        shell.rm("pubkey.txt");
      }
      cb();
    });

  vorpal
    .command("sa", "see accounts")
    .option("-n, --name <name>", "name of contact")
    .types({
      string: ["n", "name"],
    })
    .action((args, cb) => {
      console.log(args);
      if (args.options.name) {
        seeSingleContact(args.options.name);
      } else {
        seeContacts();
      }
      cb();
    });
};

exe();

module.exports = exe;
