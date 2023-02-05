import { BUDGET_EXCEEDED, BUDGET_OK } from "@/global/constants";
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
async function afterPayUpdate(sum: number, spentAt: Date, _categoryId: string) {
  const budget = await budgetRepository.getByCategory(_categoryId);
  if (budget) {
    const usedAmount = +budget.usedAmount + +sum;
    const lastExpense = new Date(spentAt);
    const state = usedAmount > budget.sum ? BUDGET_EXCEEDED : BUDGET_OK;
    await budgetRepository.update(budget._id, {
      usedAmount,
      lastExpense,
      state,
    });
  }
}
async function afterEditUpdate(expense: any, sum: number, _categoryId: string) {
  // 1) IF EXPENSE AND CATEGORY DO NOT CHANGE
  if (sum == expense.sum && expense._categoryId == _categoryId) {
    console.log("ALL SAME");
    return;
  }
  // 2) IF EXPENSE INCREASES AND CATEGORY DOES NOT CHANGE
  else if (sum > expense.sum && expense._categoryId == _categoryId) {
    console.log("INCREASE, SAME CATEGORY");
    const budget = await budgetRepository.getByCategory(_categoryId);
    if (budget) {
      const diff = +sum - +expense.sum;
      console.log("DIFF", diff);
      const usedAmount = +budget.usedAmount + +diff;
      console.log("USED AMOUNT", usedAmount);
      const state =
        usedAmount > budget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("STATE", state);
      await budgetRepository.update(budget._id, {
        usedAmount,
        state,
      });
    }
  }
  // 3) IF EXPENSE DECREASES AND CATEGORY DOES NOT CHANGE (SAME AS 2)
  else if (sum < expense.sum && expense._categoryId == _categoryId) {
    console.log("DECREASE, SAME CATEGORY");
    const budget = await budgetRepository.getByCategory(_categoryId);
    if (budget) {
      const diff = +sum - +expense.sum;
      console.log("DIFF", diff);
      const usedAmount = +budget.usedAmount + +diff;
      console.log("USED AMOUNT", usedAmount);
      const state =
        usedAmount > budget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("STATE", state);
      await budgetRepository.update(budget._id, {
        usedAmount,
        state,
      });
    }
  }
  // 4) IF EXPENSE DOES NOT CHANGE AND CATEGORY CHANGES
  else if (sum == expense.sum && expense._categoryId != _categoryId) {
    console.log("SAME SUM, DIFF CATEGORY");
    const prevBudget = await budgetRepository.getByCategory(
      expense._categoryId
    );
    if (prevBudget) {
      console.log("PREV BUDGET SUM", prevBudget.usedAmount);
      console.log("SUM", sum);
      const usedAmount = +prevBudget.usedAmount - +sum;
      console.log("USED AMOUNT", usedAmount);
      const state =
        usedAmount > prevBudget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("STATE", state);
      await budgetRepository.update(prevBudget._id, {
        usedAmount,
        state,
      });
    }
    const newBudget = await budgetRepository.getByCategory(_categoryId);
    if (newBudget) {
      const usedAmount = +newBudget.usedAmount + +sum;
      console.log("NEW BUDGET USED AMOUNT", usedAmount);
      const state =
        usedAmount > newBudget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("NEW BUDGET STATE", state);
      await budgetRepository.update(newBudget._id, {
        usedAmount,
        state,
      });
    }
  }
  // 5) IF EXPENSE INCREASES AND CATEGORY CHANGES
  else if (sum > expense.sum && expense._categoryId != _categoryId) {
    console.log("INCREASE, DIFF CATEGORY");
    const prevBudget = await budgetRepository.getByCategory(
      expense._categoryId
    );
    const substract = expense.sum;
    const add = sum;
    if (prevBudget) {
      const usedAmount = +prevBudget.usedAmount - +substract;
      console.log("USED AMOUNT", usedAmount);
      const state =
        usedAmount > prevBudget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("STATE", state);
      await budgetRepository.update(prevBudget._id, {
        usedAmount,
        state,
      });
    }
    const newBudget = await budgetRepository.getByCategory(_categoryId);
    if (newBudget) {
      const usedAmount = +newBudget.usedAmount + +add;
      console.log("NEW BUDGET USED AMOUNT", usedAmount);
      const state =
        usedAmount > newBudget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("NEW BUDGET STATE", state);
      await budgetRepository.update(newBudget._id, {
        usedAmount,
        state,
      });
    }
  }
  // 6) IF EXPENSE DECREASES AND CATEGORY CHANGES (SAME AS 5)
  else if (sum < expense.sum && expense._categoryId != _categoryId) {
    console.log("DECREASE, DIFF CATEGORY");
    const prevBudget = await budgetRepository.getByCategory(
      expense._categoryId
    );
    const substract = expense.sum;
    const add = sum;
    if (prevBudget) {
      const usedAmount = +prevBudget.usedAmount - +substract;
      console.log("USED AMOUNT", usedAmount);
      const state =
        usedAmount > prevBudget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("STATE", state);
      await budgetRepository.update(prevBudget._id, {
        usedAmount,
        state,
      });
    }
    const newBudget = await budgetRepository.getByCategory(_categoryId);
    if (newBudget) {
      const usedAmount = +newBudget.usedAmount + +add;
      console.log("NEW BUDGET USED AMOUNT", usedAmount);
      const state =
        usedAmount > newBudget.usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
      console.log("NEW BUDGET STATE", state);
      await budgetRepository.update(newBudget._id, {
        usedAmount,
        state,
      });
    }
  }
}
async function afterDeleteUpdate(sum: number, _categoryId: string) {
  const budget = await budgetRepository.getByCategory(_categoryId);
  if (budget) {
    const usedAmount = +budget.usedAmount - +sum;
    const state = usedAmount > budget.sum ? BUDGET_EXCEEDED : BUDGET_OK;
    await budgetRepository.update(budget._id, {
      usedAmount,
      state,
    });
  }
}
async function remove(id: string) {
  const res = await budgetRepository.remove(id);
  return res;
}
async function exists(_userId: string, _categoryId: string) {
  const res = await budgetRepository.exists(_userId, _categoryId);
  return res;
}
export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  afterPayUpdate,
  afterDeleteUpdate,
  afterEditUpdate,
  exists,
};
