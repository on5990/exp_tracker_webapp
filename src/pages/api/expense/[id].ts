import { BUDGET_EXCEEDED, BUDGET_OK } from "@/global/constants";
import expenseValidation from "@/lib/backendHelpers/validations/expense.validation";
import budgetRepository from "@/repositories/budget.repository";
import budgetService from "@/services/budget.service";
import categoryService from "@/services/category.service";
import expenseService from "@/services/expense.service";
import userService from "@/services/user.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  description: string;
  sum: string | number;
  spentAt: Date;
  _categoryId?: any;
  _userId: any;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, query, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    const id = query.id?.toString() || "";
    // CHECK IF ID IS VALID
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      res.status(400);
      return res.json({ success: false, error: "Invalid id" });
    }
    // CHECK IF EXPENSE EXISTS
    const expense = await expenseService.getOne(id);
    if (!expense) {
      res.status(404);
      return res.json({ success: false, error: "Expense not found" });
    }
    switch (method) {
      case "PUT":
        // VALIDATE INPUT FROM FRONTEND
        await expenseValidation.addSchema.validateAsync(body);
        // PREPARE DATA
        const { description, sum, spentAt, _categoryId } = body;
        let data: Data = {
          description,
          sum,
          spentAt: new Date(spentAt),
          _userId: userId,
        };
        const category = await categoryService.getOne(_categoryId);
        if (!category) {
          res.status(404);
          return res.json({ success: false, error: "Category not found" });
        } else {
          data = { ...data, _categoryId };
        }
        // UPDATE EXPENSE
        const dbUpdate = await expenseService.update(id, data);
        // UPDATE BUDGETS
        await budgetService.afterEditUpdate(expense, sum, _categoryId);
        // FIND ALL INFO OF EXPENSES
        const expenses = await expenseService.getAll(userId);
        // UPDATE USER AVERAGES
        const avg = await userService.updateAvg(userId, expenses);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          msg: `${dbUpdate._id} was updated`,
          data: {
            ...expenses,
            monthlyAvg: avg.monthAvg,
            yearlyAvg: avg.yearAvg,
          },
        });
      case "DELETE":
        // DELETE
        const dbDelete = await expenseService.remove(id);
        // UPDATE BUDGETS
        await budgetService.afterDeleteUpdate(expense.sum, expense._categoryId);
        // FIND ALL INFO OF EXPENSES
        const _expenses = await expenseService.getAll(userId);
        // UPDATE USER AVERAGES
        const { monthAvg, yearAvg } = await userService.updateAvg(
          userId,
          _expenses
        );
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          msg: `${dbDelete._id} was deleted`,
          data: { ..._expenses, monthlyAvg: monthAvg, yearlyAvg: yearAvg },
        });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default handler;
