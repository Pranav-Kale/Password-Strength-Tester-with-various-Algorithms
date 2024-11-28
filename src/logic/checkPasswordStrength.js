import checkNamePatterns from "./checkNamePatterns";

const checkPasswordStrength = (password, username, firstName, lastName) => {
  const lengthCheck = password?.length >= 8;
  const capitalCheck = /[A-Z]/?.test(password);
  const specialCheck = /[!@#$%^&*(),.?":{}|<>]/?.test(password);
  const numberCheck = /[0-9]/?.test(password);

  const nameStrength = checkNamePatterns(
    password,
    username,
    firstName,
    lastName
  );

  let strength = "Weak";
  if (nameStrength === "Weak") {
    strength = "Weak";
  } else if (lengthCheck && capitalCheck && specialCheck && numberCheck) {
    strength = "Strong";
  } else if (lengthCheck && (capitalCheck || specialCheck || numberCheck)) {
    strength = "Medium";
  }

  return { lengthCheck, capitalCheck, specialCheck, numberCheck, strength };
};

export default checkPasswordStrength;
