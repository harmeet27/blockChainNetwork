const bodyParser = require("body-parser");
const express = require("express");
const BlockChain = require("./blockchain");
const PubSub = require("./pubsub");

const app = express();
app.use(bodyParser.json());

const blockchain = new BlockChain();

const pubsub = new PubSub({ blockchain });

setTimeout(() => pubsub.broadCastChain(), 2000);

app.get("/api/blocks", (req, res) => {
  res.json(blockchain.blockchainArray);
});

app.post("/api/addBlock", (req, res) => {
  const { data } = req.body;
  blockchain.addBlock({ data });
  res.redirect("/api/blocks");
});

const PORT = 3000;

app.listen(PORT, () => console.log(`listening at localhost: ${PORT}`));
