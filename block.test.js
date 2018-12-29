const hexToBinary = require("hex-to-binary");
const Block = require("./block");
const { GENISIS_BLOCK, Mine_Rate } = require("./config");
const crypto = require("./crypto-hash");

describe("Block", () => {
  const timeStamp = 2000;
  const lastHash = "lasthash";
  const hash = "presenthash";
  const data = ["blockchain", "data"];
  const nonce = 1;
  const difficulty = 1;
  let block = "";
  beforeEach(() => {
    block = new Block({
      timeStamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty
    });
  });
  //   const timeStamp = 2000;
  //   const lastHash = "lasthash";
  //   const hash = "presenthash";
  //   const data = ["blockchain", "data"];
  //   const nonce = 1;
  //   const difficulty = 1;
  //   const block = new Block({
  //     timeStamp,
  //     lastHash,
  //     hash,
  //     data,
  //     nonce,
  //     difficulty
  //   });

  it("has all props", () => {
    expect(block.timeStamp).toEqual(timeStamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
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
    const lastBlock = Block.genisis();
    const data = "mine";
    const mineBlock = Block.mineBlock(lastBlock, data);
    it("returns block", () => {
      expect(mineBlock instanceof Block).toBe(true);
    });
    it("returns mineblock `lastHash` equal to `GENISIS_BLOCK` `hash`", () => {
      expect(mineBlock.lastHash).toEqual(GENISIS_BLOCK.hash);
    });
    it("creates a hash based on proper inputs", () => {
      expect(mineBlock.hash).toEqual(
        crypto(
          mineBlock.timeStamp,
          lastBlock.hash,
          data,
          mineBlock.nonce,
          mineBlock.difficulty
        )
      );
    });

    it("sets a hash that matches the difficulty criteria", () => {
      expect(
        hexToBinary(mineBlock.hash).substring(0, mineBlock.difficulty)
      ).toEqual("0".repeat(mineBlock.difficulty));
    });

    it("adjust the difficulty", () => {
      const pResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1];
      expect(pResults.includes(mineBlock.difficulty)).toBe(true);
    });
  });

  describe("adjustDifficulty", () => {
    it("devreases difficulty level when block is mined to slow", () => {
      expect(
        Block.arrangeDifficulty({
          originalBlock: block,
          timeStamp: timeStamp + Mine_Rate - 100
        })
      ).toEqual(block.difficulty + 1);
    });
    it("raises difficulty level when block is mined to fast", () => {
      expect(
        Block.arrangeDifficulty({
          originalBlock: block,
          timeStamp: timeStamp + Mine_Rate + 100
        })
      ).toEqual(block.difficulty - 1);
    });
    it("has a lower limit of 1", () => {
      block.difficulty = -1;
      expect(Block.arrangeDifficulty({ originalBlock: block })).toEqual(1);
    });
  });
});
