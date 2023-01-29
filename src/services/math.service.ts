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

function calcTotalByCat(expenses: Array<any>) {
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
// PENDIENTE
function calcTotalExcess(budgets: Array<any>) {
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
  calcTotalByCat,
  calcMonthlyAvg,
  calcYearlyAvg,
  calcTotalExcess,
};
