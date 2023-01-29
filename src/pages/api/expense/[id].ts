import expenseValidation from "@/lib/backendHelpers/validations/expense.validation";
import categoryService from "@/services/category.service";
import expenseService from "@/services/expense.service";
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
        // UPDATE USER AVERAGES
        // UPDATE BUDGETS
        // FIND ALL INFO OF EXPENSES
        const expenses = await expenseService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          msg: `${dbUpdate._id} was updated`,
          data: { ...expenses },
        });
      case "DELETE":
        // DELETE
        const dbDelete = await expenseService.remove(id);
        // UPDATE USER AVERAGES
        // UPDATE BUDGETS
        // FIND ALL INFO OF EXPENSES
        const _expenses = await expenseService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          msg: `${dbDelete._id} was deleted`,
          data: { ..._expenses },
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
