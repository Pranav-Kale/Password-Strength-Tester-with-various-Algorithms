import React from "react";

const PmtCmb = ({ password, firstName, lastName, dob }) => {
  // Generate combinations logic
  const generateWordList = () => {
    if (!firstName || !lastName || !dob) return []; // Ensure inputs are provided
    const results = new Set();
    
    const dobYear = dob?.slice(0, 4); // YYYY
    const dobDayMonth = dob?.slice(5)?.replace("-", ""); // DDMM
    
    const capitalize = (word) =>
      word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();

    const variations = [
      firstName,
      lastName,
      capitalize(firstName),
      capitalize(lastName),
    ];

    // Generate password formats
    variations?.forEach((name) => {
      results?.add(`${name}@${dobYear}`); // name@yyyy
      results?.add(`${name}_${dobDayMonth}`); // name_ddmm
      results?.add(`${name}_${dobDayMonth}_${dobYear}`); // name_ddmm_yyyy
    });

    results?.add(`${capitalize(firstName)}${capitalize(lastName)}${dobYear}`); // NameLastNameYYYY
    results?.add(`${firstName}@${dobYear}!`); // name@yyyy!
    results?.add(`${capitalize(firstName)}${capitalize(lastName)}${dobYear}`); // Capitalized full name with year
    results?.add(`${lastName}@${dobDayMonth}`); // last_name@ddmm
    results?.add(`${lastName}_${dobYear}`); // last_name_yyyy
    results?.add(`${capitalize(firstName)}_${capitalize(lastName)}@${dobDayMonth}`); // Name_LastName@ddmm

    return Array?.from(results); // Convert Set to Array to avoid duplicates
  };

  const wordlist = generateWordList();

  return (
    <div>
      <h2>Generated Wordlist:</h2>
      <ul>
        {wordlist?.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default PmtCmb;
