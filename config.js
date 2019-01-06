const crypto = require("./util/crypto-hash");

const timeStamp = 1;
const lastHash = "-----";
const defaultDfficulty = 2;
const Mine_Rate = 1000;
const GENISIS_BLOCK = {
  timeStamp: timeStamp,
  lastHash: lastHash,
  hash: crypto(timeStamp, lastHash),
  data: [],
  nonce: 0,
  difficulty: defaultDfficulty
};
const STARTING_BALANCE = 1000;
module.exports = { GENISIS_BLOCK, Mine_Rate, STARTING_BALANCE };
