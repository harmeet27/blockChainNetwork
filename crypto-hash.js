const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto
    .createHash("sha256")
    .update(inputs.sort().join(" "))
    .digest("hex");
  return hash;
};

module.exports = cryptoHash;
