/**
 * @return bool
 * @param {string} fullname 
 * @param {string} username  
 * @param {string} password
 * @function returns a bool after validating the login form  
 */
export const loginValidation = (fullname, username, password) => {
  let fullnamePattern = /^(\S+) (\S*)?\s*(\S+)$/,
    usernamePattern = /^[a-zA-Z]{3}\/[0-9]{2}\/[0-9]{4}$/;
  return (
    fullnamePattern.test(fullname.trim()) &&
    usernamePattern.test(username.trim()) &&
    password.length > 3
  );
};
