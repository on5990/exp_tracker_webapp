import {
  ACT_CREATE,
  BUDGET_EXCEEDED,
  BUDGET_OK,
  MONTH,
  MONTHLY_FIXED,
  MONTHLY_UND,
  YEAR,
} from "@/global/constants";

function calcWeeklyTotal(expenses: Array<any>) {
  // this week interval
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  let startOfWeek = new Date(now);
  startOfWeek.setUTCDate(now.getUTCDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  let endOfWeek = new Date(now);
  endOfWeek.setUTCDate(now.getUTCDate() + (6 - dayOfWeek));
  endOfWeek.setHours(23, 59, 59, 0);
  // get expenses and calculate the total
  const total = expenses.reduce((acc, current) => {
    if (
      new Date(current.spentAt).getTime() >= new Date(startOfWeek).getTime() &&
      new Date(current.spentAt).getTime() <= new Date(endOfWeek).getTime()
    ) {
      return acc + current.sum;
    }
    return acc;
  }, 0);
  return total;
}

function calcMonthlyTotal(expenses: Array<any>) {
  const now = new Date();
  let startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);
  let endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 0);
  const total = expenses.reduce((acc, current) => {
    if (
      new Date(current.spentAt).getTime() >= new Date(startOfMonth).getTime() &&
      new Date(current.spentAt).getTime() <= new Date(endOfMonth).getTime()
    ) {
      return acc + current.sum;
    }
    return acc;
  }, 0);
  return total;
}

function calcYearlyTotal(expenses: Array<any>) {
  const now = new Date();
  let startOfYear = new Date(now.getFullYear(), 0, 1);
  startOfYear.setHours(0, 0, 0, 0);
  let endOfYear = new Date(now.getFullYear() + 1, 0, 0);
  endOfYear.setHours(23, 59, 59, 0);
  const total = expenses.reduce((acc, current) => {
    if (
      new Date(current.spentAt).getTime() >= new Date(startOfYear).getTime() &&
      new Date(current.spentAt).getTime() <= new Date(endOfYear).getTime()
    ) {
      return acc + current.sum;
    }
    return acc;
  }, 0);
  return total;
}

function classifyByCat(expenses: Array<any>) {
  try {
    let classifiedExpenses = expenses.reduce((acc, current) => {
      if (!acc[current._categoryId]) {
        acc[current._categoryId] = {
          _categoryId: current._categoryId,
          expenses: [],
          total: 0,
        };
      }
      acc[current._categoryId].expenses.push(current);
      acc[current._categoryId] = {
        ...acc[current._categoryId],
        total: acc[current._categoryId].total + current.sum,
      };
      return acc;
    }, {});
    return Object.values(classifiedExpenses);
  } catch (error) {
    console.log(error);
  }
}
// CALCULATE AMOUNT USED, AMOUNT AVAILABLE, EXCESS, LAST UPDATE, STATE
function calcBudgetInfo(expenses: Array<any>, sum: number) {
  if (expenses.length === 0) {
    return {
      usedAmount: 0,
      lastExpense: null,
      state: BUDGET_OK,
    };
  }
  const usedAmount = expenses.reduce((acc, current) => {
    return acc + current.sum;
  }, 0);
  // const amountAvailable = usedAmount > sum ? 0 : sum - usedAmount;
  const excess = usedAmount > sum ? usedAmount - sum : 0;
  const lastExpense = expenses[0].spentAt;
  const state = excess === 0 ? BUDGET_OK : BUDGET_EXCEEDED;
  return {
    usedAmount,
    state,
    lastExpense,
  };
}

// GET THE LAST PAYMENT
function calcLastPayment(
  prevPayment: any,
  payments: number,
  type: string,
  action: string
) {
  if (!prevPayment || !payments || !type) {
    return false;
  }
  let add = payments;
  if (action == ACT_CREATE) {
    add = add - 1;
  }
  const timeType = type == MONTHLY_FIXED || type == MONTHLY_UND ? MONTH : YEAR;
  // let year, month;
  if (timeType === MONTH) {
    let month: number = new Date(prevPayment).getMonth();
    // console.log("111111111111", month);
    month = month + add;
    // console.log(action, "MONTH", month);
    let year: number = new Date(prevPayment).getFullYear();
    // console.log(action, "YEAR", year);
    if (month > 11) {
      year = year + Math.floor(month / 12);
      // console.log(action, "MONTH > 11", month);
      month = month % 12;
      // console.log(action, "YEAR (MONTH > 11)", year);
    }
    // console.log(action, "MONTH RETURN", month);
    // console.log(action, "YEAR RETURN", year);
    const result = new Date(year, month + 1, 0);
    console.log(action, "RESULT", result);
    return result;
  } else {
    let year = new Date(prevPayment).getFullYear() + add;
    console.log(action, "YEAR", year);
    return new Date(year, 11, 31);
  }
}
// PENDIENTE
function calcTotalExcess(budgets: Array<any>, expenses: Array<any>) {
  // calculate total usedAmount
}
// PENDIENTE
function calcMonthlyAvg(expenses: Array<any>) {
  // CLASSIFY EXPENSES PER MONTH
  // GET EACH TOTAL
  // CALCULATE AVERAGE
}
// PENDIENTE
function calcYearlyAvg(expenses: Array<any>) {
  // CLASSIFY EXPENSES PER YEAR
  // GET EACH TOTAL
  // CALCULATE AVERAGE
}
export default {
  calcWeeklyTotal,
  calcMonthlyTotal,
  calcYearlyTotal,
  classifyByCat,
  calcMonthlyAvg,
  calcYearlyAvg,
  calcTotalExcess,
  calcBudgetInfo,
  calcLastPayment,
};
