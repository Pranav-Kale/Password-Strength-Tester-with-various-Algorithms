import React from "react";

const PatternMatch = ({ password, firstName, lastName, dob }) => {
  const generatePatterns = () => {
    if (!firstName || !lastName || !dob) return []; // Ensure inputs are provided

    const results = new Set();
    const dobYear = dob?.slice(0, 4); // YYYY
    const dobMonth = dob?.slice(5, 7); // MM
    const dobDay = dob?.slice(8, 10); // DD
    const dobFull = dob?.replaceAll("-", ""); // YYYYMMDD
    const dobReverse = `${dobDay}${dobMonth}${dobYear}`; // DDMMYYYY

    const suffixes = ["123", "!", "$", "2023", dobYear]; // Common suffixes
    const prefixes = ["@", "#", "password", "pass"]; // Common prefixes

    const capitalize = (word) =>
      word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();

    const variations = [
      firstName,
      lastName,
      capitalize(firstName),
      capitalize(lastName),
    ];

    // Generate date-based patterns
    results?.add(dobFull); // YYYYMMDD
    results?.add(dobReverse); // DDMMYYYY
    results?.add(`${dobYear}${dobMonth}`); // YYYYMM

    // Add suffixes to variations
    variations?.forEach((name) => {
      suffixes?.forEach((suffix) => {
        results?.add(`${name}${suffix}`); // name123, name!
        results?.add(`${capitalize(name)}${suffix}`); // Capitalized name123, name!
      });
    });

    // Add prefixes to variations
    variations?.forEach((name) => {
      prefixes?.forEach((prefix) => {
        results?.add(`${prefix}${name}`); // @name, #name
        results?.add(`${prefix}${capitalize(name)}`); // @Name, #Name
      });
    });

    // Combine dates with names
    variations?.forEach((name) => {
      results?.add(`${name}${dobFull}`); // nameYYYYMMDD
      results?.add(`${name}${dobReverse}`); // nameDDMMYYYY
    });

    // Add some combined patterns
    results?.add(`${firstName}${lastName}${dobYear}`); // firstNameLastNameYYYY
    results?.add(`${capitalize(firstName)}${capitalize(lastName)}${dobYear}`); // Capitalized full name YYYY

    return Array?.from(results); // Convert Set to Array
  };

  const patterns = generatePatterns();

  return (
    <div>
      <h2>Generated Patterns:</h2>
      <ul>
        {patterns?.map((pattern, index) => (
          <li key={index}>{pattern}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatternMatch;
