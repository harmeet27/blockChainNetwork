const crypto = require("./crypto-hash");

const timeStamp = 1;
const lastHash = "-----";
const GENISIS_BLOCK = {
  timeStamp: timeStamp,
  lastHash: lastHash,
  hash: crypto(timeStamp, lastHash),
  data: []
};

module.exports = { GENISIS_BLOCK };
