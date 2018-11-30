const express = require('express');
const app = express();
const SHA256 = require('crypto-js/sha256');
const http = require('http');
const port = process.env.PORT || 5000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

let chain = [{
  uuid: 1,
  next: null,
  prev: null,
  hash: SHA256(null).toString(),
  previous_hash: 0,
  data: "",
  nonce: 0
}];

io.on('connection', socket => {
  socket.on('updateBlockchain', data => {
    socket.broadcast.emit('updateBlockchain', data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

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
    hash: SHA256("" + 0 + parent_block.previous_hash).toString(),
    previous_hash: parent_block.hash,
    data: '',
    nonce: 0
  }

  parent_block.next = block.uuid;
  chain.push(block);

  res.send({data: chain});
});
