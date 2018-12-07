const Block = require('./Block').Block
const express = require('express');
const app = express();
const SHA256 = require('crypto-js/sha256');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = require('socket.io')(server);


let connections = [];
let difficulty = "000"
let chain = [ new Block(1, "Genesis block", "0000000000000000000000000000000000000000000000000000000000000000") ];

io.on('connection', socket => {
  connections.push(socket);

  socket.emit("fetchBlockchain", chain, difficulty);

  socket.on('addBlock', data => {
    const parent_block = chain[chain.length -1]
    let block = new Block(parent_block.id + 1, data, parent_block.hash);
    chain.push(block);
    io.emit('fetchBlockchain', chain, difficulty);
  });

  socket.on('updateDifficulty', new_difficulty => {
    difficulty = new_difficulty;
    io.emit('fetchBlockchain', chain, difficulty)

  });

  socket.on('updateBlockchain', data => {
    chain = data;
    socket.broadcast.emit('fetchBlockchain', data, difficulty);
  });

  socket.on('disconnect', reason => {
    let index = connections.indexOf(socket);
    connections.splice(index, 1);

    if (!connections.length) {
      chain.splice(1, chain.length);
    }
  });
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(express.static(path.join(__dirname, "client/build")));
