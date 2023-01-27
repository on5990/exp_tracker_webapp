import expenseValidation from "@/lib/validations/expense.validation";
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

async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    switch (method) {
      case "GET":
        // GET INFO OF THE USER
        const user = await userService.getById(
          new mongoose.Types.ObjectId(userId)
        );
        // GET EXPENSES BY USER_ID
        const expenses = await expenseService.getAll(userId);
        // GET CATEGORIES BY USER_ID
        // CALC MONTHLY, WEEKLY, YEARLY TOTALS
        // CALC TOTAL BY CATEGORY
        // CALC TOTAL EXCESS BY GETTING THE BUDGET INFO
        res.status(200);
        return res.json({ success: true, data: { expenses } });
      case "POST":
        await expenseValidation.addSchema.validateAsync(body);
        // CREATE EXPENSE
        const { description, sum, spentAt, _categoryId } = body;
        let data: Data = {
          description,
          sum,
          spentAt: new Date(spentAt),
          _userId: userId,
        };
        const category = await categoryService.getOne(_categoryId);
        if (_categoryId && !category) {
          res.status(404);
          return res.json({ success: false, error: "Category not found" });
        } else {
          data = { ...data, _categoryId };
        }
        const expense = await expenseService.create(data);
        // UPDATE BUDGET
        // GET UPDATED INFO ABOUT EXPENSES
        res.status(200);
        return res.json({ success: true, data: { expense } });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default index;
