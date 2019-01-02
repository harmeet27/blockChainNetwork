const crypto = require("./crypto-hash");

describe("check hash function", () => {
  testString = 1;
  generatedHash =
    "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b";

  it("has hash equal to `generatedHash`", () => {
    expect(crypto(testString)).toEqual(generatedHash);
  });
});
