const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const BlockChain = require("./blockchain");
const PubSub = require("./app/pubsub");

const app = express();
app.use(bodyParser.json());

const blockchain = new BlockChain();

const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//setTimeout(() => pubsub.broadCastChain(), 2000);

app.get("/api/blocks", (req, res) => {
  res.json(blockchain.blockchainArray);
});

app.post("/api/addBlock", (req, res) => {
  const { data } = req.body;
  blockchain.addBlock({ data });
  pubsub.broadCastChain();
  res.redirect("/api/blocks");
});

const options = {
  url: `${ROOT_NODE_ADDRESS}/api/blocks`,
  method: "GET"
};

const syncChain = () => {
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const rootChain = JSON.parse(body);
      blockchain.replaceChain(rootChain);
      console.log(
        "synchronized with a longer chain",
        blockchain.blockchainArray
      );
    }
  });
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  if (PORT !== DEFAULT_PORT) {
    syncChain();
  }
  console.log(`listening at localhost: ${PORT}`);
});
