const checkNamePatterns = (password, firstName, lastName, dob) => {
    const lowerCasePassword = password?.toLowerCase();
    const lowerCaseFirstName = firstName?.toLowerCase();
    const lowerCaseLastName = lastName?.toLowerCase();
  
    // Initialize feedback
    let feedback = [];
  
    // Validate DOB before processing
    let dobParts = [];
    if (dob) {
      dobParts = dob?.split("-"); // Split only if dob exists
    } else {
      console.warn("DOB is not provided or is in an invalid format.");
    }
  
    const [dobYear, dobMonth, dobDay] = dobParts;
  
    // Generate common DOB patterns if parts are valid
    const dobPatterns = dobParts?.length === 3
      ? [
          dobYear,                  // yyyy
          dobDay + dobMonth,        // ddmm
          dobYear + dobMonth,       // yyyymm
          dobYear + dobDay,         // yyyydd
          dobDay + dobMonth + dobYear, // ddmmyyyy
          dobMonth + dobDay + dobYear, // mmddyyyy
        ]
      : []; // Empty array if DOB is invalid
  
    // Check for first name
    if (lowerCaseFirstName && lowerCasePassword?.includes(lowerCaseFirstName)) {
      feedback?.push(`Password contains your first name : ${firstName} .`);
    }
  
    // Check for last name
    if (lowerCaseLastName && lowerCasePassword?.includes(lowerCaseLastName)) {
      feedback?.push(`Password contains your last name : ${lastName} .`);
    }
  
    // Check for DOB patterns
    dobPatterns?.forEach((pattern) => {
      if (lowerCasePassword?.includes(pattern)) {
        feedback?.push(`Password contains a part of your date of birth: ${pattern}`);
      }
    });
  
    // Combine feedback messages or return a strong indicator
    return feedback?.length > 0
      ? { feedback, isWeak: true } // Weak password due to containing sensitive info
      : { feedback: ["Password does not contain personal information."], isWeak: false }; // Strong password
  };
  
  export default checkNamePatterns;
  