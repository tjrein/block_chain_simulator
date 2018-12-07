const SHA256 = require('crypto-js/sha256');

function Block(id, data, previous_hash) {
  this.id = id;
  this.data = data;
  this.previous_hash = previous_hash;
  this.nonce = 0;
  this.hash = SHA256(data + this.nonce + previous_hash).toString();
}

module.exports.Block = Block;
