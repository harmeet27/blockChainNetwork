const hashToBinary = require("hex-to-binary");
const { GENISIS_BLOCK, Mine_Rate } = require("./config");
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
    let { difficulty } = lastBlock;
    const lastHash = lastBlock.hash;
    let hash = crypto(timeStamp, lastHash, data, nonce, difficulty);

    while (
      hashToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    ) {
      timeStamp = Date.now();
      difficulty = Block.arrangeDifficulty({
        originalBlock: lastBlock,
        timeStamp
      });
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

  static arrangeDifficulty({ originalBlock, timeStamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 0) return 1;
    if (timeStamp - originalBlock.timeStamp > Mine_Rate) {
      return difficulty - 1;
    }
    return difficulty + 1;
  }
}

module.exports = Block;
