import expenseValidation from "@/lib/backendHelpers/validations/expense.validation";
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
        // GET INFO OF THE USER
        const user = await userService.getById(userId);
        // GET EXPENSES BY USER_ID
        const expenses = await expenseService.getAll(userId);
        // GET CATEGORIES BY USER_ID
        const categories = await categoryService.getAll(userId);
        // CALC MONTHLY, WEEKLY, YEARLY TOTALS
        const weeklyTotal = mathService.calcWeeklyTotal(expenses || []);
        const monthlyTotal = mathService.calcMonthlyTotal(expenses || []);
        const yearlyTotal = mathService.calcYearlyTotal(expenses || []);
        // CALC TOTAL BY CATEGORY
        const totalsByCategory = mathService.calcTotalByCat(expenses || []);
        // CALC TOTAL EXCESS BY GETTING THE BUDGET INFO
        const budgets = await budgetService.getAll(userId);
        const excess = mathService.calcTotalExcess(budgets || []);
        // PREPARE OUTPUT
        const output = {
          expenses,
          categories,
          monthlyAvg: user.monthlyAvg,
          yearlyAvg: user.yearlyAvg,
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
        const expense = await expenseService.create(data);
        // 2)  UPDATE BUDGET
        // 3)  UPDATE AVERAGES LOCATED IN USER COLLECTION
        // 4) GET UPDATED INFO ABOUT EXPENSES
        // SUCCESSFUL REQUEST
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
