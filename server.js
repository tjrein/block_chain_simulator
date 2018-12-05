import Block from "./Block.js";
const express = require('express');
const app = express();
const SHA256 = require('crypto-js/sha256');
const http = require('http');
const port = process.env.PORT || 5000;
//const host = '0.0.0.0';
const server = require('http').Server(app);
const io = require('socket.io')(server);


let connections = [];
let chain = [ new Block(1, "This is a test", "000") ];

io.on('connection', socket => {
  connections.push(socket);

  socket.emit("fetchBlockchain", chain);

  socket.on('addBlock', (data) => {
    const parent_block = chain[chain.length -1]
    let block = new Block(parent_block.id + 1, data, parent_block.hash);
    chain.push(block);
    io.emit('fetchBlockchain', chain);
  });

  socket.on('updateBlockchain', data => {
    chain = data;
    socket.broadcast.emit('fetchBlockchain', data);
  });

  socket.on('disconnect', reason => {
    let index = connections.indexOf(socket);
    connections.splice(index, 1);

    if (!connections.length) {
      chain.splice(1, chain.length);
    }
  });
});

//server.listen(port, host, () => console.log(`Listening on port ${port}`));
server.listen(port, () => console.log(`Listening on port ${port}`));
