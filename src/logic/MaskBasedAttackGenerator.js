import React, { useState } from "react";

const MaskBasedAttackGenerator = ({ password, firstName, lastName, dob }) => {
  // Function to generate characters based on the mask type
  const getCharacterForMask = (mask) => {
    const digits = "0123456789";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/~";

    switch (mask) {
      case "d": // Digit
        return digits[Math?.floor(Math.random() * digits?.length)];
      case "l": // Lowercase letter
        return lowercase[Math?.floor(Math?.random() * lowercase?.length)];
      case "u": // Uppercase letter
        return uppercase[Math?.floor(Math?.random() * uppercase?.length)];
      case "s": // Special character
        return specialChars[Math?.floor(Math?.random() * specialChars?.length)];
      case "a": // Any character
        return (
          digits + lowercase + uppercase + specialChars
        )[Math?.floor(Math?.random() * (digits + lowercase + uppercase + specialChars)?.length)];
      default:
        return "";
    }
  };

  // Function to generate passwords based on the given mask pattern
  const generatePasswords = (mask) => {
    const results = new Set();

    // Iterate over the mask and generate passwords
    for (let i = 0; i < 5; i++) {
      let passwordVariation = "";
      for (let j = 0; j < mask?.length; j++) {
        const charType = mask[j];
        passwordVariation += getCharacterForMask(charType);
      }
      results?.add(passwordVariation);
    }

    return Array?.from(results); // Convert Set to Array
  };

  // Example masks (you can adjust these based on your needs)
  const exampleMasks = [
    "??d??l!", // Digit, digit, lowercase letter, lowercase letter, special character
    "??a??d",  // Any character, any character, digit, digit
    "??u??l",  // Uppercase letter, uppercase letter, lowercase letter, lowercase letter
    "??d??a",  // Digit, digit, any character, any character
  ];

  // Generate passwords for each mask pattern
  const wordlist = exampleMasks?.flatMap((mask) => generatePasswords(mask));

  return (
    <div>
      <h2>Mask-Based Attack Password Variations:</h2>
      <ul>
        {wordlist?.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default MaskBasedAttackGenerator;
