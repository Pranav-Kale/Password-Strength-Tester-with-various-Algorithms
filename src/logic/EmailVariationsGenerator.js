import React from "react";

const EmailVariationsGenerator = ({ email }) => {
  // Helper function to split the email into parts
  const getEmailParts = () => {
    const [username, domain] = email?.split("@") || [];
    const [domainName, domainExtension] = domain?.split(".") || [];
    return { username, domainName, domainExtension };
  };

  // Generate simple variations
  const generateSimpleVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}@${domainName}.${domainExtension}`,
      `${username}@${domainName}`,
      `${domainName}@${username}.${domainExtension}`,
      `${username}.${domainName}`,
      `${username}.${domainName}.${domainExtension}`
    ];
  };

  // Generate variations with symbols or special characters
  const generateSymbolVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}@${domainName}!`,
      `${username}@${domainName}#`,
      `${username}!@${domainName}.${domainExtension}`,
      `${username}@${domainName}.${domainExtension}!`,
      `${username}@${domainName}@com`
    ];
  };

  // Generate reversed format variations
  const generateReversedVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${domainName}.${domainExtension}@${username}`,
      `${domainExtension}@${domainName}.${username}`,
      `${domainExtension}.${domainName}@${username}`
    ];
  };

  // Generate variations with capitalization
  const generateCapitalizationVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username?.charAt(0)?.toUpperCase() + username?.slice(1)}@${domainName?.charAt(0)?.toUpperCase() + domainName?.slice(1)}.${domainExtension}`,
      `${username?.toUpperCase()}@${domainName?.toLowerCase()}.${domainExtension}`,
      `${username}@${domainName?.charAt(0).toUpperCase() + domainName?.slice(1)}.${domainExtension}`,
      `${username?.toUpperCase()}@${domainName?.toUpperCase()}.${domainExtension}`
    ];
  };

  // Generate variations with numbers or additional words
  const generateNumberAndWordVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}2024@${domainName}.${domainExtension}`,
      `${username}123@${domainName}.${domainExtension}`,
      `${username}@${domainName}123.${domainExtension}`,
      `${username}123@${domainName}!${domainExtension}`,
      `${username}_123@${domainName}.${domainExtension}`
    ];
  };

  // Generate variations combining email with DOB or other info
  const generateDOBVariations = (dob) => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}${dob}@${domainName}.${domainExtension}`,
      `${username}@${domainName}${dob}.${domainExtension}`,
      `${username}@${domainName}.${dob}.${domainExtension}`,
      `${username}_doe${dob}@${domainName}.${domainExtension}`
    ];
  };

  // Generate variations with periods, hyphens, or underscores
  const generatePunctuationVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}.${domainName}@${domainName}.${domainExtension}`,
      `${username}-${domainName}@${domainName}.${domainExtension}`,
      `${username}_${domainName}@${domainName}.${domainExtension}`,
      `${username}@${domainName}_${domainExtension}.com`
    ];
  };

  // Generate variations with prefixes or suffixes
  const generatePrefixSuffixVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `user@${domainName}_${domainExtension}!`,
      `!${username}@${domainName}.${domainExtension}`,
      `${username}@${domainName}.${domainExtension}!`,
      `${username}@${domainName}-com!`
    ];
  };

  // Generate complex variations
  const generateComplexVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}@${domainName}123!_example`,
      `!${username}!@!${domainName}.${domainExtension}#`,
      `${username}@${domainName}!${domainExtension}com`,
      `${username}@${domainName}.${domainExtension}*2024!`
    ];
  };

  // Generate variations with repetition
  const generateRepetitionVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}.${username}@${domainName}.${domainExtension}`,
      `${username}@${domainName}.${domainExtension}@${domainName}.${domainExtension}`
    ];
  };

  // Generate variations with random characters, symbols, and numbers
  const generateRandomVariations = () => {
    const { username, domainName, domainExtension } = getEmailParts();
    return [
      `${username}!@${domainName}123$`,
      `${username}&${domainName}@${domainExtension}!`,
      `${username}123!@${domainName}!2024`
    ];
  };

  // Collect all variations in one array
  const generateAllVariations = () => {
    const allVariations = [
      ...generateSimpleVariations(),
      ...generateSymbolVariations(),
      ...generateReversedVariations(),
      ...generateCapitalizationVariations(),
      ...generateNumberAndWordVariations(),
      ...generateDOBVariations("01-01-1990"), // Example DOB
      ...generatePunctuationVariations(),
      ...generatePrefixSuffixVariations(),
      ...generateComplexVariations(),
      ...generateRepetitionVariations(),
      ...generateRandomVariations()
    ];
    return allVariations;
  };

  const variations = generateAllVariations();

  return (
    <div>
      <h2>Email Variations:</h2>
      <ul>
        {variations?.map((variation, index) => (
          <li key={index}>{variation}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmailVariationsGenerator;
