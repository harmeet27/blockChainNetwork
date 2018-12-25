const Blockchain = require("./blockchain");
const Block = require("./block");

describe("blockchain class functionality test", () => {
  let blockChain;
  let newChain;
  let originalChain;
  beforeEach(() => {
    blockChain = new Blockchain();
    newChain = new Blockchain();
    originalChain = blockChain.blockchainArray;
  });
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

  describe("valid blockchain test", () => {
    beforeEach(() => {
      blockChain.addBlock({ data: "block1" });
      blockChain.addBlock({ data: "block2" });
      blockChain.addBlock({ data: "block3" });
    });

    describe("first block check for genesis", () => {
      it("return false", () => {
        blockChain.blockchainArray[0].data = ["fake data"];
        expect(blockChain.validateChain(blockChain.blockchainArray)).toBe(
          false
        );
      });

      it("return false in case of chain invalid", () => {
        blockChain.blockchainArray[2].data = "wrong-value";
        expect(blockChain.validateChain(blockChain.blockchainArray)).toBe(
          false
        );
      });

      it("return false in case of last hash is different", () => {
        blockChain.blockchainArray[2].lastHash = "fdgshj";
        expect(blockChain.validateChain(blockChain.blockchainArray)).toBe(
          false
        );
      });
      it("return true for correct chain", () => {
        expect(blockChain.validateChain(blockChain.blockchainArray)).toBe(true);
      });

      it("return true for correct chain1", () => {
        blockChain.blockchainArray[0].hash = "fdgshj";
        expect(blockChain.validateChain(blockChain.blockchainArray)).toBe(
          false
        );
      });
    });
  });

  describe("replaceChian()", () => {
    beforeEach(() => {
      newChain.addBlock({ data: "block1" });
      newChain.addBlock({ data: "block2" });
      newChain.addBlock({ data: "block3" });
    });
    describe("when chain is not longer", () => {
      it("does not replace the chian", () => {
        newChain.blockchainArray[0] = { new: "data" };
        blockChain.replaceChain(newChain.blockchainArray);
        expect(blockChain.blockchainArray).toEqual(originalChain);
      });
    });

    describe("when chain is longer", () => {
      describe("when chain is not valid", () => {
        it("does not replace the chian", () => {
          newChain.blockchainArray[2].lastHash = "ggygs";
          blockChain.replaceChain(newChain.blockchainArray);
          expect(blockChain.blockchainArray).toEqual(originalChain);
        });
      });
    });
  });
});
