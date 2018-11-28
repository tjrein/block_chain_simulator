const express = require('express');
const app = express();
const SHA256 = require('crypto-js/sha256');
const port = process.env.PORT || 5000;

let chain = [{
  uuid: 1,
  next: null,
  prev: null,
  hash: SHA256(null).toString(),
  data: "",
  nonce: 0
}];

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/blockchain', (req, res) => {
  res.send({data: chain});
});

app.get('/api/addblock', (req, res) => {
  const parent_block = chain[chain.length -1]

  let block = {
    uuid: parent_block.uuid + 1,
    prev: parent_block.uuid,
    next: null,
    parent: parent_block.uuid,
    hash: SHA256("" + 0 + parent_block.uuid).toString(),
    data: '',
    nonce: 0
  }

  parent_block.next = block.uuid;
  chain.push(block);

  res.send({data: chain});
});
