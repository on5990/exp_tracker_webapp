import budgetValidation from "@/lib/backendHelpers/validations/budget.validation";
import budgetService from "@/services/budget.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, query, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    const id = query.id?.toString() || "";
    // CHECK IF ID IS VALID
    const validId = mongoose.Types.ObjectId.isValid(id as string);
    if (!validId) {
      res.status(400);
      return res.json({ success: false, error: "Invalid id" });
    }
    // CHECK IF BUDGET EXISTS
    const budget = await budgetService.getOne(id);
    if (!budget) {
      res.status(404);
      return res.json({ success: false, error: "Budget not found" });
    }
    switch (method) {
      case "PUT":
        // VALIDATE INPUT FROM FRONTEND
        await budgetValidation.updateSchema.validateAsync(body);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: "PUT BUDGET" });
      case "DELETE":
        // DELETE BUDGET
        const dbDelete = await budgetService.remove(id);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: { msg: `${dbDelete._id} was deleted`, budget: dbDelete },
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
