import React from "react";

const StringManipulation = ({ firstName, lastName, password }) => {
  // Function to reverse a string
  const reverseString = (str) => {
    return str?.split("")?.reverse()?.join("");
  };

  // Generate strings by appending, prepending, or concatenating inputs
  const generateStringManipulations = () => {
    const prefixes = ["Mr", "Ms", "Dr", "Prof"];
    const suffixes = ["@", "!", "123", "@2023", "_secure"];
    const results = new Set();

    // Generate basic manipulations
    const inputs = [firstName, lastName, password];
    inputs?.forEach((input) => {
      if (input) {
        prefixes?.forEach((prefix) => results?.add(`${prefix}${input}`));
        suffixes?.forEach((suffix) => results?.add(`${input}${suffix}`));
        results?.add(reverseString(input)); // Add reversed string
      }
    });

    // Generate concatenated combinations
    const combinedInputs = [
      `${firstName}${lastName}`,
      `${lastName}${firstName}`,
      `${firstName}${password}`,
      `${lastName}${password}`,
      `${firstName}${lastName}${password}`,
    ];

    combinedInputs.forEach((combo) => {
      if (combo) {
        results?.add(combo);
        prefixes?.forEach((prefix) => results?.add(`${prefix}${combo}`));
        suffixes?.forEach((suffix) => results?.add(`${combo}${suffix}`));
        results?.add(reverseString(combo)); // Add reversed string
      }
    });

    return Array?.from(results); // Convert Set to Array to ensure deduplication
  };

  // Generate the manipulated strings
  const manipulatedStrings = generateStringManipulations();

  return (
    <div>
      <h2>String Manipulation Variations:</h2>
      <ul>
        {manipulatedStrings?.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default StringManipulation;
