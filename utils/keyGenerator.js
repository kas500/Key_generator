const crypto = require('crypto');

// Function to generate a 256-bit secret key (32 bytes)
function generateSecretKey() {
  // Generate a random 32-byte key
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
}

module.exports = { generateSecretKey };
