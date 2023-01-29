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
  const totalsByCategory = mathService.calcTotalByCat(expenses || []);
  // CALC TOTAL EXCESS BY GETTING THE BUDGET INFO
  const budgets = await budgetRepository.getAll(userId);
  const excess = mathService.calcTotalExcess(budgets || []);
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
export default { getAll, getOne, create, update, remove };
