const { GENISIS_BLOCK } = require("./config");
const crypto = require("./crypto-hash");

class Block {
  constructor({ timeStamp, lastHash, hash, data }) {
    this.timeStamp = timeStamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genisis() {
    return new this(GENISIS_BLOCK);
  }

  static mineBlock(lastBlock, data) {
    const timeStamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = crypto(timeStamp, lastHash, data);
    const blc = new this({ timeStamp, lastHash, hash, data });
    return blc;
  }
}

module.exports = Block;
