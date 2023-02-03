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
  try {
    let add = payments;
    if (action == ACT_CREATE) {
      add = add - 1;
    }
    console.log("PREV", prevPayment);
    console.log("PAYMENTS", add);
    console.log("type", type);

    const timeType =
      type == MONTHLY_FIXED || type == MONTHLY_UND ? MONTH : YEAR;
    if (timeType === MONTH) {
      let month = new Date(prevPayment).getMonth();
      month = month + +add;
      let year = new Date(prevPayment).getFullYear();
      if (month > 11) {
        year = year + Math.floor(month / 12);
        month = month % 12;
      }
      const result = new Date(year, month + 1, 0);
      return result;
    } else {
      let year = new Date(prevPayment).getFullYear() + +add;
      return new Date(year, 11, 31);
    }
  } catch (error) {
    return false;
  }
}
// PENDIENTE
function calcTotalExcess(budgets: Array<any>, expenses: Array<any>) {
  // calculate total usedAmount
}
// PENDIENTE
function calcExpenseAvg(expenses: Array<any>) {
  const result = expenses.reduce(
    (acc, current) => {
      acc = { ...acc, total: acc.total + current.sum };
      const spentAt = new Date(current.spentAt);
      const year = spentAt.getFullYear().toString();
      let month = spentAt.getMonth().toString();
      month = `${month}/${year}`;
      if (!acc.monthList.includes(month)) {
        acc.monthList.push(month);
        acc.monthAmount = acc.monthAmount + 1;
      }
      if (!acc.yearList.includes(year)) {
        acc.yearList.push(year);
        acc.yearAmount = acc.yearAmount + 1;
      }
      return acc;
    },
    { total: 0, monthAmount: 0, yearAmount: 0, monthList: [], yearList: [] }
  );
  const monthAvg = (+result.total / +result.monthAmount).toFixed(2);
  const yearAvg = (+result.total / +result.yearAmount).toFixed(2);
  return { monthAvg, yearAvg };
}

function calcFinalPayment(firstPayment: Date, amount: number, type: string) {
  try {
    if (amount == 1) {
      return new Date(firstPayment);
    }
    const timeType =
      type == MONTHLY_FIXED || type == MONTHLY_UND ? MONTH : YEAR;
    if (timeType === MONTH) {
      let year = new Date(firstPayment).getFullYear();
      let month = new Date(firstPayment).getMonth();
      month = +month + +amount - 1;
      let date = new Date(year, month + 1, 0, 0, 0, 0);
      return date;
    } else {
      let year = new Date(firstPayment).getFullYear();
      year = +year + +amount - 1;
      let date = new Date(year, 12, 0, 0, 0, 0);
      return date;
    }
  } catch (error) {
    console.log(error);
  }
}
function calcBillMonth(bills: Array<any>, expenses: Array<any>) {
  // BILLS CALCULATED ARE MONTHLY AND HAVE A DEFINED AMOUNT TO PAY
  // const monthlyExpenses =
}
function calcBillYear(bills: Array<any>, expenses: Array<any>) {
  // BILLS CALCULATED AND HAVE A DEFINED AMOUNT TO PAY
  // MONTHLY BILLS X TIMES PAID IN THE YEAR
  // make interval: first payment - final payment
  // if
  // YEARLY BILLS
}
export default {
  calcWeeklyTotal,
  calcMonthlyTotal,
  calcYearlyTotal,
  classifyByCat,
  calcExpenseAvg,
  calcTotalExcess,
  calcBudgetInfo,
  calcLastPayment,
  calcBillMonth,
  calcBillYear,
  calcFinalPayment,
};
