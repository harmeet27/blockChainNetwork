const { GENISIS_BLOCK } = require("./config");
const crypto = require("./crypto-hash");

class Block {
  constructor({ timeStamp, lastHash, hash, data, nonce, difficulty }) {
    this.timeStamp = timeStamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genisis() {
    return new this(GENISIS_BLOCK);
  }

  static mineBlock(lastBlock, data) {
    let nonce = 0;
    let timeStamp = Date.now();
    const { difficulty } = lastBlock;
    const lastHash = lastBlock.hash;
    let hash = crypto(timeStamp, lastHash, data, nonce, difficulty);

    while (hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
      timeStamp = Date.now();
      nonce++;
      hash = crypto(timeStamp, lastHash, data, nonce, difficulty);
    }

    const blc = new this({
      timeStamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty
    });
    return blc;
  }
}

module.exports = Block;
