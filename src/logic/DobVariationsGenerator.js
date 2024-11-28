import React from "react";

const DobVariationsGenerator = ({ dob }) => {
  // Simple Format Variations (numeric-only)
  const simpleFormats = [
    dob?.replace(/-/g, ""), // ddmmyyyy (e.g., 01011990)
    dob?.split("-")?.reverse()?.join(""), // yyyyddmm (e.g., 19900101)
    dob?.split("-")?.join(""), // dd/mm/yyyy (e.g., 01011990) - just removing separators
  ];

  // Reversed Formats (numeric-only)
  const reversedFormats = [
    dob?.split("-")?.reverse()?.join(""), // yyyyddmm (e.g., 19900101)
    dob?.split("-")?.reverse()?.join("")?.repeat(2), // mmddyyyyyyyy (e.g., 010119901990)
    dob?.split("-")?.reverse()?.join("") + dob?.replace(/-/g, ""), // yyyyyyyyddmm (e.g., 199019900101)
  ];

  // Capitalization Variations: Only numeric (no alphabetic)
  const capitalizationFormats = [
    dob?.replace(/^(\d{2})(\d{2})(\d{4})$/, (match, p1, p2, p3) => p1 + p2 + p3), // ddmmyyyy
    dob?.replace(/^(\d{2})(\d{2})(\d{4})$/, (match, p1, p2, p3) => p1 + p2 + p3), // ddmmyyyy
  ];

  // With Symbols or Separators (numeric-only)
  const withSymbols = [
    dob?.replace(/-/g, "@"), // yyyy@ddmm (e.g., 1990@0101)
    dob?.replace(/-/g, "_"), // mm_dd_yyyy (e.g., 01_01_1990)
    dob?.replace(/-/g, "!"), // yyyy!ddmm (e.g., 1990!0101)
  ];

  // Add more numeric variations if needed

  // Combine all numeric variations
  const allNumericVariations = [
    ...simpleFormats,
    ...reversedFormats,
    ...capitalizationFormats,
    ...withSymbols,
  ];

  // Remove duplicates
  const uniqueVariations = [...new Set(allNumericVariations)];

  return (
    <div>
      <h2>DOB-Based Numeric Password Variations:</h2>
      <ul>
        {uniqueVariations?.map((variation, index) => (
          <li key={index}>{variation}</li>
        ))}
      </ul>
    </div>
  );
};

export default DobVariationsGenerator;
