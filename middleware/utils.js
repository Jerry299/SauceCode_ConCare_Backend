const getDate = () => {
  const date = new Date();
  return date;
};

// const simpleValidator = (req,res) => {
//   //     Passwords must be
//   //  * - At least 8 characters long, max length anything
//   //  * - Include at least 1 lowercase letter
//   //  * - 1 capital letter
//   //  * - 1 number
//   //  * - 1 special character => !@#$%^&*
//   const passwordregex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   // do some basic validation
//   if (firstName === "" && !firstName) {
//     return res.status(400).json({
//       error: "Invalid Name Format",
//     });
//   }
//   if (lastName === "" && !lastName) {
//     return res.status(400).json({
//       error: "Invalid Name Format",
//     });
//   }
//   if (!passwordregex.test(password)) {
//     return res.status(400).json({
//       error:
//         "Password should be 8 letters long and contain a Capital letter,number and special character",
//     });
//   }
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({
//       error: "Invalid Email Format",
//     });
//   }
//   // simple validation ends
// }

module.exports = {
  getDate,
};
