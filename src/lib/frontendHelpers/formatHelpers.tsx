/**
 * Check if the email has a valid format
 * @param {string} email
 * @returns {Boolean}
 */
function isEmail(email: string): Boolean {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
/**
 * Check if the password is safe: 8 characters minimum; must contain at least one uppercase, lowercase, special character and number
 * @param {string} password
 * @returns {Boolean}
 */
function isSafe(password: string): Boolean {
  let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}
export default {
  isEmail,
  isSafe,
};
