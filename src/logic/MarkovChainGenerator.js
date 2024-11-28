import React from "react";

const MarkovChainGenerator = ({ password, firstName, lastName, dob }) => {
  const generateMarkovWordlist = () => {
    const inputs = [
      password,
      firstName,
      lastName,
      dob?.replaceAll("-", ""), // Cleaned DOB
      dob?.slice(0, 4), // Extract year
      dob?.slice(5, 7), // Extract month
      dob?.slice(8, 10), // Extract day
    ];
    const validInputs = inputs.filter(Boolean); // Remove empty/undefined inputs
    const results = new Set();

    // Helper function to build Markov transitions
    const buildMarkovChain = (input) => {
      const chain = {};
      for (let i = 0; i < input?.length - 1; i++) {
        const current = input[i];
        const next = input[i + 1];
        if (!chain[current]) {
          chain[current] = {};
        }
        chain[current][next] = (chain[current][next] || 0) + 1;
      }
      return chain;
    };

    // Helper function to generate variations
    const generateFromMarkovChain = (chain, maxLength) => {
      let currentChar = Object?.keys(chain)[Math?.floor(Math?.random() * Object?.keys(chain)?.length)];
      let variation = currentChar;

      while (variation?.length < maxLength) {
        const nextCharOptions = chain[currentChar];
        if (!nextCharOptions) break;

        const totalWeight = Object?.values(nextCharOptions)?.reduce((a, b) => a + b, 0);
        const rand = Math?.floor(Math?.random() * totalWeight);
        let cumulativeWeight = 0;

        for (const [char, weight] of Object?.entries(nextCharOptions)) {
          cumulativeWeight += weight;
          if (rand < cumulativeWeight) {
            variation += char;
            currentChar = char;
            break;
          }
        }
      }
      return variation;
    };

    // Build a Markov Chain for each input and generate variations
    validInputs?.forEach((input) => {
      const chain = buildMarkovChain(input);
      for (let i = 0; i < 5; i++) {
        const variation = generateFromMarkovChain(chain, 12); // Generate up to 12 characters
        results?.add(variation);
      }
    });

    // Add combined patterns
    validInputs?.forEach((input) => {
      validInputs?.forEach((otherInput) => {
        if (input !== otherInput) {
          results?.add(`${input}_${otherInput}`);
          results?.add(`${otherInput}-${input}`);
          results?.add(`${input}${otherInput}`);
          results?.add(`${otherInput}${input}`);
        }
      });
    });

    // Add reversed and special combinations
    validInputs.forEach((input) => {
      results?.add(input.split("")?.reverse()?.join("")); // Reversed input
      results?.add(`${input}!`);
      results?.add(`@${input}`);
    });

    // Generate additional patterns
    validInputs.forEach((input) => {
      results?.add(`${input}123`);
      results?.add(`${input}${dob?.slice(0, 4)}`);
      results?.add(`${dob?.slice(0, 4)}${input}`);
    });

    return Array?.from(results); // Convert the Set to an Array
  };

  const wordlist = generateMarkovWordlist();

  return (
    <div>
      <h2>Markov Chain Password Variations:</h2>
      <ul>
        {wordlist?.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default MarkovChainGenerator;
