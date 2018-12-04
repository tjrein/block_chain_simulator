import sha256 from 'crypto-js/sha256';
//const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(id, data, previous_hash) {
    this.id = id
    this.nonce = 0
    this.data = data
    this.hash = sha256(data + this.nonce + previous_hash).toString();
    this.previous_hash = previous_hash
  }
}

export default Block;
