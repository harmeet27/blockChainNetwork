const Blockchain = require("./blockchain");
const Block = require("./block");

describe("blockchain class functionality test", () => {
  const blockChain = new Blockchain();
  it("blockchain array check", () => {
    expect(blockChain.blockchainArray instanceof Array).toBe(true);
  });

  it("blockchain starts with genesis block", () => {
    expect(blockChain.blockchainArray[0]).toEqual(Block.genisis());
  });

  it("blockchain add block", () => {
    const data = "newNodeData1";
    blockChain.addBlock({ data });

    expect(
      blockChain.blockchainArray[blockChain.blockchainArray.length - 1].data
    ).toEqual(data);
  });
});
