const crypto = require("../util/crypto-hash");
const Block = require("./block");
class Blockchain {
  constructor() {
    this.blockchainArray = [Block.genisis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock(
      this.blockchainArray[this.blockchainArray.length - 1],
      data
    );
    this.blockchainArray.push(newBlock);
  }

  validateChain(blockchainArray) {
    if (
      JSON.stringify(blockchainArray[0]) !== JSON.stringify(Block.genisis())
    ) {
      return false;
    }

    for (let i = 1; i < blockchainArray.length; i++) {
      const block = blockchainArray[i];
      const lastDifficulty = blockchainArray[i - 1].difficulty;
      const { timeStamp, lastHash, hash, data, nonce, difficulty } = block;
      const prevBlock = blockchainArray[i - 1];
      if (hash !== crypto(timeStamp, lastHash, data, nonce, difficulty)) {
        return false;
      }
      if (prevBlock.hash !== lastHash) {
        return false;
      }

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.blockchainArray.length) {
      console.log(
        "Not replaced:",
        "new chain length is not longer than original chain"
      );
      return;
    }
    if (!this.validateChain(newChain)) {
      console.log("Not replaced:", "invalid Chain");
      return;
    }
    this.blockchainArray = newChain;
    console.log("replaced Chain:", this.blockchainArray);
  }
}

module.exports = Blockchain;
