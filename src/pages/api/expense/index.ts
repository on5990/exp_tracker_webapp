import expenseValidation from "@/lib/validations/expense.validation";
import userService from "@/services/user.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

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
        // GET CATEGORIES BY USER_ID
        // CALC MONTHLY, WEEKLY, YEARLY TOTALS
        // CALC TOTAL BY CATEGORY
        // CALC TOTAL EXCESS BY GETTING THE BUDGET INFO
        res.status(200);
        return res.json({ success: true, data: "GET EXPENSE" });
      case "POST":
        await expenseValidation.addSchema.validateAsync(body);
        // CREATE EXPENSE
        const { _categoryId } = body;
        const includeCategory = false;
        if (_categoryId) {
          // FIND CATEGORY
          // IF NOT FOUND RES 404
        }

        // UPDATE BUDGET
        // GET UPDATED INFO ABOUT EXPENSES
        res.status(200);
        return res.json({ success: true, data: "POST EXPENSE" });
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
