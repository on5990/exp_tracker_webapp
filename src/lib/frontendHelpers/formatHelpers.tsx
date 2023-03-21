import { nanoid } from "nanoid";
import { MONTHS } from "@/global/constants";
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
    if (num > 0 && !isNaN(amount)) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
function isPositiveInteger(input: number | any): Boolean {
  let re = /^\d*[1-9]\d*$/;
  return re.test(input);
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
function formatDate(date: Date | any): string {
  let strDate = new Date(date)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  return strDate;
}
function generateYearArray(): Array<any> {
  const startYear = 2022;
  const years = Array.from({ length: 29 }, (_, i) =>
    (startYear + i).toString()
  );
  const yearsArray = years.map((year) => {
    return { id: year, value: year, label: year };
  });
  return yearsArray;
}

function generateMonthArray(): Array<any> {
  const startYear = 2022;
  const length = 348;
  const months = Array.from({ length }, (_, i) => {
    return { year: startYear + Math.floor(i / 12), month: i % 12 };
  });
  const monthArray = months.map((item) => {
    const month = MONTHS[item.month];
    const monthNumber = item.month;
    const year = item.year;
    return {
      id: nanoid(),
      label: `${month}\t${year}`,
      value: `${monthNumber},${year}`,
    };
  });
  return monthArray;
}
export default {
  isEmail,
  isSafe,
  formatTime,
  formatDate,
  validAmount,
  isPositiveInteger,
  generateYearArray,
  generateMonthArray,
};
