import budgetValidation from "@/lib/validations/budget.validation";
import budgetService from "@/services/budget.service";
import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    switch (method) {
      case "GET":
        // GET BUDGETS
        const budgets = await budgetService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: { budgets } });
      case "POST":
        // VALIDATE DATA FROM FRONTEND
        await budgetValidation.addSchema.validateAsync(body);
        // PREPARE DATA
        // CREATE BUDGET
        // UPDATE BUDGET IF THERE ARE EXPENSES ASSOCIATE TO THE BUDGET'S CATEGORY
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: "POST BUDGET" });
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
