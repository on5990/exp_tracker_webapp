import budgetRepository from "@/repositories/budget.repository";
import expenseRepository from "@/repositories/expense.repository";
import userRepository from "@/repositories/user.repository";
import mathService from "./math.service";

async function getOne(id: string) {
  const expense = await expenseRepository.getOne(id);
  return expense;
}

// PENDIENTE
async function getAll(userId: string) {
  // GET INFO OF THE USER
  const user = await userRepository.getById(userId);
  // GET EXPENSES BY USER_ID
  const expenses = await expenseRepository.getAll(userId);
  // CALC MONTHLY, WEEKLY, YEARLY TOTALS
  const weeklyTotal = mathService.calcWeeklyTotal(expenses || []);
  const monthlyTotal = mathService.calcMonthlyTotal(expenses || []);
  const yearlyTotal = mathService.calcYearlyTotal(expenses || []);
  // MAKE ARRAY WITH EXPENSES AND TOTAL BY CATEGORY
  const totalsByCategory = mathService.classifyByCat(expenses || []);
  // PREPARE OUTPUT
  const output = {
    expenses,
    monthlyAvg: user.monthlyAvg,
    yearlyAvg: user.yearlyAvg,
    weeklyTotal,
    monthlyTotal,
    yearlyTotal,
    totalsByCategory,
  };
  return output;
}
async function getByBill(_billId: string) {
  const res = await expenseRepository.getByBill(_billId);
  return res;
}
// PENDIENTE
async function create(data: any) {
  const expense = await expenseRepository.create(data);
  return expense;
}
// PENDIENTE
async function update(id: string, data: any) {
  const res = await expenseRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: string) {
  const res = await expenseRepository.remove(id);
  return res;
}
async function removeByBillId(_billId: string) {
  const res = await expenseRepository.removeByBillId(_billId);
  return res;
}
async function filterAndSumPayments(_userId: string, _billId: string) {
  const expenses = await expenseRepository.getAll(_userId);
  const exp = expenses
    ? expenses.filter((item) => item._billId && item._billId == _billId)
    : [];
  const total = exp.reduce((acc, curr) => {
    return +acc + +curr.sum;
  }, 0);
  const categoryId = exp[0] ? exp[0]._categoryId : null;
  return { expenses: exp, total, categoryId };
}
export default {
  getAll,
  getOne,
  getByBill,
  create,
  update,
  remove,
  removeByBillId,
  filterAndSumPayments,
};
