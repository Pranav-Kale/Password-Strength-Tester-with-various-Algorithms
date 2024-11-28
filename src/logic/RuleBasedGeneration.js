import React from "react";

const RuleBasedGeneration = ({ password, firstName, lastName }) => {
  // Helper function to replace characters with uppercase variations
  const applyUppercaseRules = (input) => {
    const results = new Set();

    // Generate variations by making each character uppercase
    const chars = input.split("");
    const generateVariations = (index = 0, current = "") => {
      if (index === chars?.length) {
        results?.add(current);
        return;
      }

      // Keep the current character as lowercase
      generateVariations(index + 1, current + chars[index]);

      // Convert the current character to uppercase
      generateVariations(index + 1, current + chars[index]?.toUpperCase());
    };

    generateVariations();
    return Array?.from(results);
  };

  // Rule-based generation logic
  const generateRuleBasedPasswords = () => {
    const results = new Set();

    // Base inputs
    const inputs = [firstName, lastName, password];

    // Common numbers and symbols
    const commonNumbers = ["123", "2023", "001", "007"];
    const commonSymbols = ["!", "@", "#", "$"];

    inputs.forEach((input) => {
      if (input) {
        // Append numbers and symbols
        commonNumbers?.forEach((num) => results?.add(`${input}${num}`));
        commonSymbols?.forEach((sym) => results?.add(`${input}${sym}`));

        // Prepend numbers and symbols
        commonNumbers?.forEach((num) => results?.add(`${num}${input}`));
        commonSymbols?.forEach((sym) => results?.add(`${sym}${input}`));

        // Apply uppercase rules
        applyUppercaseRules(input)?.forEach((variation) => results?.add(variation));
      }
    });

    // Combine inputs with rules
    inputs?.forEach((input1, i) => {
      inputs.forEach((input2, j) => {
        if (i !== j && input1 && input2) {
          const combined = `${input1}${input2}`;
          results.add(combined);

          // Apply rules to combined inputs
          commonNumbers?.forEach((num) => results?.add(`${combined}${num}`));
          commonSymbols?.forEach((sym) => results?.add(`${combined}${sym}`));
          applyUppercaseRules(combined)?.forEach((variation) => results?.add(variation));
        }
      });
    });

    return Array?.from(results); // Convert Set to Array
  };

  const passwords = generateRuleBasedPasswords();

  return (
    <div>
      <h2>Rule-Based Generated Passwords:</h2>
      <ul>
        {passwords?.map((pwd, index) => (
          <li key={index}>{pwd}</li>
        ))}
      </ul>
    </div>
  );
};

export default RuleBasedGeneration;
