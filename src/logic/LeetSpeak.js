import React from "react";

const LeetSpeak = ({ firstName, lastName, password }) => {
  const leetSubstitutions = {
    a: ["@", "4"],
    e: ["3", "€"],
    i: ["1", "!"],
    o: ["0", "°"],
    s: ["$", "5"],
    A: ["@", "4"],
    E: ["3", "€"],
    I: ["1", "!"],
    O: ["0", "°"],
    S: ["$", "5"],
  };

  const commonSuffixes = ["123", "!", "@2023", "2023!", "###"];
  const commonPrefixes = ["$", "!", "@"];

  // Transform a string into all leetspeak variations
  const transformToLeet = (input) => {
    if (!input) return [input];
    const results = new Set();

    const helper = (chars, index, current) => {
      if (index === chars.length) {
        results?.add(current);
        return;
      }

      const char = chars[index];
      const substitutions = leetSubstitutions[char] || [char];

      substitutions.forEach((sub) => {
        helper(chars, index + 1, current + sub);
      });
    };

    helper(input.split(""), 0, "");
    return Array?.from(results);
  };

  const generateLeetWords = () => {
    const inputs = [firstName, lastName, password];
    const results = new Set();

    inputs.forEach((input) => {
      if (input) {
        const variations = transformToLeet(input);
        variations?.forEach((variation) => results?.add(variation));
      }
    });

    // Add combined inputs
    const combinedInputs = [
      `${firstName}${lastName}`,
      `${firstName}${password}`,
      `${lastName}${password}`,
      `${firstName}${lastName}${password}`,
    ];

    combinedInputs.forEach((combo) => {
      transformToLeet(combo)?.forEach((variation) => results?.add(variation));
    });

    // Add suffixes and prefixes
    Array?.from(results)?.forEach((word) => {
      commonSuffixes?.forEach((suffix) => results?.add(`${word}${suffix}`));
      commonPrefixes?.forEach((prefix) => results?.add(`${prefix}${word}`));
    });

    return Array?.from(results);
  };

  const leetWords = generateLeetWords();

  return (
    <div>
      <h2>Enhanced Leetspeak Variations:</h2>
      <ul>
        {leetWords?.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeetSpeak;
