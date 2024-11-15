"use client";

import { useState } from "react";
import { generateSecretKey } from "../utils/keyGenerator";
import { encrypt, decrypt } from "../utils/encryptPwdGenerator";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [password, setPassword] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");

  // Generate secret key
  const handleGenerateKey = () => {
    const secretKey = generateSecretKey();
    setGeneratedKey(secretKey);
  };

  // Encrypt the password
  const handleEncrypt = () => {
    if (!password) {
      alert("Please enter a plain password.");
      return;
    }
    const encrypted = encrypt(password, generatedKey);
    setEncryptedPassword(encrypted);
    setDecryptedPassword(""); // Clear decrypted password when re-encrypting
  };

  // Decrypt the password
  const handleDecrypt = () => {
    try {
      const decrypted = decrypt(encryptedPassword, generatedKey);
      setDecryptedPassword(decrypted);
    } catch (error) {
      alert("Decryption failed: " + error.message);
    }
  };

  // Reset everything
  const handleReset = () => {
    setPassword("");
    setGeneratedKey("");
    setEncryptedPassword("");
    setDecryptedPassword("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Encryption Key Generator</h1>

      {/* Center the Generate Secret Key button */}
      <div className={styles.centered}>
        {!generatedKey && !encryptedPassword && (
          <button
            onClick={handleGenerateKey}
            className={styles.button}
          >
            Generate 256-Bit Secret Key
          </button>
        )}
      </div>

      {/* Display generated secret key */}
      {generatedKey && (
        <div>
          <label htmlFor="generatedKey" className={styles.label}>
            Generated Secret Key:
          </label>
          <textarea
            id="generatedKey"
            value={generatedKey}
            readOnly
            rows="2"
            className={styles.textarea}
          />
        </div>
      )}

      {/* Conditionally render password input and Encrypt button */}
      {generatedKey && (
        <>
          <label htmlFor="password" className={styles.label}>
            Enter Plain Password:
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={styles.input}
          />

          <button
            onClick={handleEncrypt}
            className={styles.button}
            disabled={!password} // Disable button until a password is entered
          >
            Encrypt Password
          </button>
        </>
      )}

      {/* Display encrypted password */}
      {encryptedPassword && (
        <div>
          <label htmlFor="encryptedPassword" className={styles.label}>
            Encrypted Password:
          </label>
          <textarea
            id="encryptedPassword"
            value={encryptedPassword}
            readOnly
            rows="4"
            className={styles.textarea}
          />
        </div>
      )}

      {/* Decrypt button */}
      {/* {encryptedPassword && (
        <button onClick={handleDecrypt} className={styles.button}>
          Decrypt Password
        </button>
      )} */}

      {/* Display decrypted password */}
      {/* {decryptedPassword && (
        <div>
          <label htmlFor="decryptedPassword" className={styles.label}>
            Decrypted Password:
          </label>
          <textarea
            id="decryptedPassword"
            value={decryptedPassword}
            readOnly
            rows="2"
            className={styles.textarea}
          />
        </div>
      )} */}

      {/* Reset button */}
      {encryptedPassword && (
        <button onClick={handleReset} className={styles.button}>
          Reset All
        </button>
      )}
    </div>
  );
}
