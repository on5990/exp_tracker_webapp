import billValidation from "@/lib/backendHelpers/validations/bill.validation";
import billService from "@/services/bill.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, query } = req;
    const id = query.id?.toString() || "";
    // CHECK IF ID IS VALID
    const validId = mongoose.Types.ObjectId.isValid(id as string);
    if (!validId) {
      res.status(400);
      return res.json({ success: false, error: "Invalid id" });
    }
    // CHECK IF BILL EXISTS
    const bill = await billService.getOne(id);
    if (!bill) {
      res.status(404);
      return res.json({ success: false, error: "Bill not found" });
    }
    switch (method) {
      case "POST":
        // VALIDATE DATA FROM FRONTEND
        await billValidation.paySchema.validateAsync(body);
        // 1) PAY
        // CREATE EXPENSE
        // UPDATE BILL
        // UPDATE BUDGET
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: "PAY BILL" });
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
