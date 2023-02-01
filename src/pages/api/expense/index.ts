import { BUDGET_EXCEEDED, BUDGET_OK } from "@/global/constants";
import expenseValidation from "@/lib/backendHelpers/validations/expense.validation";
import budgetRepository from "@/repositories/budget.repository";
import budgetService from "@/services/budget.service";
import categoryService from "@/services/category.service";
import expenseService from "@/services/expense.service";
import mathService from "@/services/math.service";
import userService from "@/services/user.service";
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
        // GET EXPENSES BY USER_ID
        const expenses = await expenseService.getAll(userId);
        // GET CATEGORIES BY USER_ID
        const categories = await categoryService.getAll(userId);
        const output = {
          ...expenses,
          categories,
        };
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: output });
      case "POST":
        await expenseValidation.addSchema.validateAsync(body);
        // 1) CREATE EXPENSE
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
        await expenseService.create(data);
        // UPDATE BUDGET
        await budgetService.afterPayUpdate(sum, spentAt, _categoryId);
        // GET UPDATED INFO ABOUT EXPENSES
        let _expenses = await expenseService.getAll(userId);
        // UPDATE AVERAGES LOCATED IN USER COLLECTION
        const { monthAvg, yearAvg } = await userService.updateAvg(
          userId,
          _expenses
        );
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
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
export default index;
