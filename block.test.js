const Block = require("./block");
const { GENISIS_BLOCK } = require("./config");

describe("Block", () => {
  const timeStamp = "date";
  const lastHash = "lasthash";
  const hash = "presenthash";
  const data = ["blockchain", "data"];
  const block = new Block({ timeStamp, lastHash, hash, data });

  it("has all props", () => {
    expect(block.timeStamp).toEqual(timeStamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genisis()", () => {
    const genisisBlock = Block.genisis();
    it("returns block", () => {
      expect(genisisBlock instanceof Block).toBe(true);
    });
    it("returns genisis data", () => {
      expect(genisisBlock).toEqual(GENISIS_BLOCK);
    });
  });

  describe("mine()", () => {
    const mineBlock = Block.mineBlock(GENISIS_BLOCK, "mine");
    it("returns block", () => {
      expect(mineBlock instanceof Block).toBe(true);
    });
    it("returns mineblock `lastHash` equal to `GENISIS_BLOCK` `hash`", () => {
      expect(mineBlock.lastHash).toEqual(GENISIS_BLOCK.hash);
    });
  });
});
