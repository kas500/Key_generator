const crypto = require("crypto");

function encrypt(text, secretKey) {
  const algorithm = 'aes-256-cbc';
  const iv = crypto.randomBytes(16); // Generate a random 16-byte IV
  const key = crypto.createHash('sha256').update(secretKey).digest(); // Create a 32-byte key

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  // Combine IV with encrypted text and return as a single string (base64 encoded)
  return iv.toString('base64') + ':' + encrypted;
}

function decrypt(encryptedText, secretKey) {
  const algorithm = "aes-256-cbc";
  const key = crypto.createHash("sha256").update(secretKey).digest(); // Create a 32-byte key

  // Split the encrypted text to extract IV and the ciphertext
  const [ivBase64, encryptedContent] = encryptedText.split(":");
  if (!ivBase64 || !encryptedContent) {
    throw new Error("Invalid encrypted text format.");
  }

  const iv = Buffer.from(ivBase64, "base64");
  const encrypted = Buffer.from(encryptedContent, "base64");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
