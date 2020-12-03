// create a simple validator for inputs
const validator = (a, b, c, d) => {
  // a to g are placeholders
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  //     Passwords must be
  //  * - At least 8 characters long, max length anything
  //  * - Include at least 1 lowercase letter
  //  * - 1 capital letter
  //  * - 1 number
  //  * - 1 special character => !@#$%^&*
  const passwordregex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  if (!nameRegex.test(a)) {
    return "Invalid FirstName";
  }
  if (!nameRegex.test(b)) {
    return "invalid Last Name";
  }
  if (!emailRegex.test(c)) {
    return "Invalid Email";
  }
  if (!passwordregex.test(d)) {
    return "Passowrd should be 8 characters long,contain special character and Alphanumeric characters";
  }
  return true;
};

module.exports = validator;
