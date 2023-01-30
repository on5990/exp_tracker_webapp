import getHelpers from "@/lib/frontendHelpers/getHelpers";
import budgetRepository from "@/repositories/budget.repository";
import categoryRepository from "@/repositories/category.repository";
import expenseRepository from "@/repositories/expense.repository";
import mathService from "./math.service";

async function getOne(id: string) {
  const budget = await budgetRepository.getOne(id);
  return budget;
}
async function getAll(userId: string) {
  const budgets = await budgetRepository.getAll(userId);
  const categories = await categoryRepository.getAll(userId);
  if (!budgets || budgets.length === 0) {
    return { budgets: [], excess: 0, categories };
  }
  // CALCULATE EXCESS, AVAILABLE AMOUNT AND GET CATEGORY NAME
  let output = budgets.reduce(
    (acc, current) => {
      const availableAmount =
        current.usedAmount <= current.sum
          ? current.sum - current.usedAmount
          : 0;
      const excessAmount =
        current.usedAmount > current.sum ? current.usedAmount - current.sum : 0;
      const category = getHelpers.getById(
        current._categoryId as string,
        categories || []
      );
      acc = {
        ...acc,
        excess: acc.excess + excessAmount,
        budgets: [
          ...acc.budgets,
          {
            ...current._doc,
            availableAmount,
            excessAmount,
            categoryName: category.name,
          },
        ],
      };
      return acc;
    },
    { budgets: [], excess: 0 }
  );
  return { ...output, categories };
}
async function create(data: any) {
  const { sum, _categoryId, _userId } = data;
  // UPDATE BUDGET IF THERE ARE EXPENSES ASSOCIATE TO THE BUDGET'S CATEGORY
  const expenses = await expenseRepository.getByCategory(_userId, _categoryId);
  const { usedAmount, lastExpense, state } = mathService.calcBudgetInfo(
    expenses || [],
    sum
  );
  // CREATE BUDGET
  const budget = await budgetRepository.create({
    sum,
    _categoryId,
    _userId,
    usedAmount,
    state,
    lastExpense,
  });
  return budget;
}
// PENDIENTE
async function update(id: string, data: any) {
  const res = await budgetRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: string) {
  const res = await budgetRepository.remove(id);
  return res;
}
export default { getAll, getOne, create, update, remove };
