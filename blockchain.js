const crypto = require("./crypto-hash");
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
      const { timeStamp, lastHash, hash, data } = block;
      const prevBlock = blockchainArray[i - 1];
      if (hash !== crypto(timeStamp, lastHash, data)) {
        return false;
      }
      if (prevBlock.hash !== lastHash) {
        return false;
      }
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.blockchainArray.length) {
      return;
    }
    if (!this.validateChain(newChain)) {
      return;
    }
    this.blockchainArray = chain;
  }
}

module.exports = Blockchain;
