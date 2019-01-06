const EC = require("elliptic").ec;
const crypto = require("./crypto-hash");

const ec = new EC("secp256k1");

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, "hex");
  return keyFromPublic.verify(crypto(data), signature);
};

module.exports = { ec, verifySignature };
