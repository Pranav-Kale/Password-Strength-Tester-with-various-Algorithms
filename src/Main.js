import React, { useState } from "react";
import checkPasswordStrength from "./logic/checkPasswordStrength";
import checkNamePatterns from "./logic/checkNamePatterns";
import PmtCmb from "./logic/PmtCmb";
import PatternMatch from "./logic/PatternMatch";
import LeetSpeak from "./logic/LeetSpeak";
import StringManipulation from "./logic/StringManipulation";
import RuleBasedGeneration from "./logic/RuleBasedGeneration";
import MarkovChainGenerator from "./logic/MarkovChainGenerator";
import MaskBasedAttackGenerator from "./logic/MaskBasedAttackGenerator";
import DobVariationsGenerator from "./logic/DobVariationsGenerator";
import EmailVariationsGenerator from "./logic/EmailVariationsGenerator";

const Main = () => {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");


  const handlePasswordChange = (event) => setPassword(event?.target?.value);
  const handleFirstNameChange = (event) => setFirstName(event?.target?.value);
  const handleLastNameChange = (event) => setLastName(event?.target?.value);
  const handleDobChange = (event) => setDob(event?.target?.value);
  const handleEmailChange = (event) => setEmail(event?.target?.value);

  const {
    lengthCheck,
    capitalCheck,
    specialCheck,
    numberCheck,
    strength,
  } = checkPasswordStrength(password);
  
  console.log("I am in main")
  const { feedback, isWeak } = checkNamePatterns(password, firstName, lastName, dob);
  console.log("Feedback :",feedback)

  console.log("Password in main : ",password);

  return (
    <div className="password-strength-meter">
      <h2>Password Strength Meter</h2>
      <form>
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

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your Email"
            onChange={handleEmailChange}
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

        {/* Display Name Pattern Feedback */}
        <div>
          <h3>
            Password Feedback:{" "}
            {isWeak
              ? feedback.map((msg, index) => <p key={index}>{msg}</p>)
              : "No personal information detected in the password."}
          </h3>
        </div>
      </form>


      {/* wordlist */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="font-bold text-2xl">PmtCmb Wordlist : </p>
          <PmtCmb password={password} firstName={firstName} lastName={lastName} dob={dob} />
        </div>
        <div>
          <p className="font-bold text-2xl">PatternMatch Wordlist : </p>
          <PatternMatch password={password} firstName={firstName} lastName={lastName} dob={dob} />
        </div>
        <div>
          <p className="font-bold text-2xl">LeetSpeak Wordlist : </p>
          <LeetSpeak firstName={firstName} lastName={lastName} password={password} />
        </div>
        <div>
          <p className="font-bold text-2xl">StringManipulation Wordlist : </p>
          <StringManipulation firstName={firstName} lastName={lastName} password={password} />
        </div>
        <div>
          <p className="font-bold text-2xl">RuleBasedGeneration Wordlist : </p>
          <RuleBasedGeneration firstName={firstName}  lastName={lastName} password={password}  />
        </div>
        <div>
          <p className="font-bold text-2xl">MarkovChainGenerator Wordlist : </p>
          <MarkovChainGenerator password={password} firstName={firstName} lastName={lastName} dob={dob} />
        </div>
        <div>
          <p className="font-bold text-2xl">MaskBasedAttackGenerator Wordlist : </p>
          <MaskBasedAttackGenerator password={password} firstName={firstName} lastName={lastName} dob={dob} />
        </div>
        <div>
          <p className="font-bold text-2xl">DobVariationsGenerator Wordlist : </p>
          <DobVariationsGenerator password={password} firstName={firstName} lastName={lastName} dob={dob} />
        </div>
        <div>
          <p className="font-bold text-2xl">EmailVariationsGenerator Wordlist : </p>
          <EmailVariationsGenerator email={email} />
        </div>
        
      </div>
    </div>
  );
};

export default Main;
