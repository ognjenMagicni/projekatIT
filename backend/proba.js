const crypto = require('crypto');

function sha256(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

// Example usage:
const myString = "Hello, world!";
const hashValue = sha256(myString);
console.log("Hash value:", hashValue);