function getExpensesByMonth(expenses: Array<any>) {
  try {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    let newList = [];
    console.log("A", thisMonth, thisYear);
    expenses.map((exp) => {
      if (
        new Date(exp.spentAt).getMonth() === thisMonth &&
        new Date(exp.spentAt).getFullYear() === thisYear
      ) {
        newList.push(exp);
      }
    });
    return expenses;
  } catch (error) {
    console.log(error);
  }
}
function getExpensesByYear(expenses: Array<any>) {
  try {
    const now = new Date();
    const thisYear = now.getFullYear();
    let newList = [];
    expenses.map((exp) => {
      if (new Date(exp.spentAt).getFullYear() === thisYear) {
        newList.push(exp);
      }
    });
    return expenses;
  } catch (error) {
    console.log(error);
  }
}
function getExpensesByCategory(expenses: Array<any>) {
  try {
    let classifiedExpenses = expenses.reduce((acc, current) => {
      if (!acc[current._categoryId]) {
        acc[current._categoryId] = {
          _categoryId: current.categoryId,
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
export default { getExpensesByMonth, getExpensesByYear, getExpensesByCategory };
