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
function validAmount(amount: number | any): Boolean {
  try {
    const num = parseFloat(amount);
    if (num > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
function formatTime(date: Date | any): string {
  try {
    let d = new Date(date);
    d = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    const strDate = d.toISOString().slice(0, -5).split("T");
    const dateSection = strDate[0].split("-").reverse().join("/");
    const time = strDate[1].split(".")[0];
    const output = `${dateSection} ${time}`;
    return output;
  } catch (error) {
    return "";
  }
}

export default {
  isEmail,
  isSafe,
  formatTime,
  validAmount,
};
