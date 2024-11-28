import React, { useState } from 'react';

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  console.log(dob);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  // Function to check if the password contains name-based patterns
  const checkNameBasedPatterns = () => {
    const lowerCasePassword = password?.toLowerCase();
    const lowerCaseFirstName = firstName?.toLowerCase();
    const lowerCaseLastName = lastName?.toLowerCase();
    const usernameCheck = username ? lowerCasePassword?.includes(username?.toLowerCase()) : false;
    const firstNameCheck = lowerCasePassword?.includes(lowerCaseFirstName);
    const lastNameCheck = lowerCasePassword?.includes(lowerCaseLastName);

    const nameCombinationCheck = firstNameCheck && lastNameCheck; // Check if both first and last name appear together

    const nameWithNumberCheck = /[0-9]/.test(password) && (lowerCasePassword?.includes(lowerCaseFirstName) || lowerCasePassword?.includes(lowerCaseLastName)); // Check if name + number is used

    const nicknames = ['johnny', 'jane_doe', 'janey']; // Add more common nicknames as needed
    const nicknameCheck = nicknames?.some((nickname) => lowerCasePassword?.includes(nickname));

    if (usernameCheck || firstNameCheck || lastNameCheck || nameCombinationCheck || nameWithNumberCheck || nicknameCheck) {
      return "Weak"; // Name-based patterns found, password is weak
    }
    return "Strong"; // No name-based patterns found
  };

  // Function to check if the password is strong
  const checkPasswordStrength = () => {
    let strength = "Weak";
    let lengthCheck = password?.length >= 8;
    let capitalCheck = /[A-Z]/.test(password);
    let specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let numberCheck = /[0-9]/.test(password);

    // Check name-based patterns
    const nameStrength = checkNameBasedPatterns();

    // Check password strength based on name patterns first
    if (nameStrength === "Weak") {
      strength = "Weak"; // If name-based patterns are found, it's weak
    } else if (lengthCheck && capitalCheck && specialCheck && numberCheck) {
      strength = "Strong";
    } else if (lengthCheck && (capitalCheck || specialCheck || numberCheck)) {
      strength = "Medium";
    }

    return {
      lengthCheck,
      capitalCheck,
      specialCheck,
      numberCheck,
      strength,
    };
  };

  const { lengthCheck, capitalCheck, specialCheck, numberCheck, strength } = checkPasswordStrength();

  return (
    <div className="password-strength-meter">
      <h2>Password Strength Meter</h2>
      <form>
        {/* Username Field */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </div>

        {/* First Name Field */}
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Enter your last name"
          />
        </div>

        {/* Date of Birth Field */}
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={handleDobChange}
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          <div>
            <p>Password Length: {password.length}</p>
            <p>{lengthCheck ? "✔️" : "❌"} Minimum length is 8 characters</p>
            <p>{capitalCheck ? "✔️" : "❌"} Includes at least one capital letter</p>
            <p>{specialCheck ? "✔️" : "❌"} Includes at least one special character</p>
            <p>{numberCheck ? "✔️" : "❌"} Includes at least one number</p>
          </div>
        </div>

        {/* Display Password Strength */}
        <div>
          <h3>Password Strength: {strength}</h3>
        </div>
      </form>
    </div>
  );
};

export default PasswordStrengthMeter;
