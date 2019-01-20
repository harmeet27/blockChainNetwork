const { STARTING_BALANCE } = require("../config.js");
const { ec } = require("../util");
const crypto = require("../util/crypto-hash");

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
    console.log(this.publicKey);
  }

  sign(data) {
    return this.keyPair.sign(crypto(data));
  }
}

module.exports = Wallet;
