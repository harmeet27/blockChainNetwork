const Block = require("./block");
class Blockchain {
  constructor() {
    console.log("hi");
    console.log(Block.genisis());
    this.blockchainArray = [Block.genisis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock(
      this.blockchainArray[this.blockchainArray.length - 1],
      data
    );
    this.blockchainArray.push(newBlock);
  }
}

module.exports = Blockchain;
