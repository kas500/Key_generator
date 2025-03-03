const crypto = require("crypto");

function encrypt(text, secretKey) {
  const algorithm = "aes-256-gcm";
  const iv = crypto.randomBytes(16); 
  const key = crypto.createHash("sha256").update(secretKey).digest();

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag().toString("base64"); 

  return `${iv.toString("base64")}:${encrypted}:${authTag}`;
}

function decrypt(encryptedText, secretKey) {
  const algorithm = "aes-256-gcm";
  const key = crypto.createHash("sha256").update(secretKey).digest();

  
  const [ivBase64, encryptedContent, authTagBase64] = encryptedText.split(":");
  if (!ivBase64 || !encryptedContent || !authTagBase64) {
    throw new Error("Invalid encrypted text format.");
  }

  const iv = Buffer.from(ivBase64, "base64");
  const encrypted = Buffer.from(encryptedContent, "base64");
  const authTag = Buffer.from(authTagBase64, "base64");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag); 

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
