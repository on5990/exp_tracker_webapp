import billValidation from "@/lib/validations/bill.validation";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, query } = req;
    const id = query.id || "";
    const validId = mongoose.Types.ObjectId.isValid(id as string);
    if (!validId) {
      res.status(400);
      return res.json({ success: false, error: "Invalid id" });
    }
    switch (method) {
      case "PUT":
        await billValidation.addSchema.validateAsync(body);
        res.status(200);
        return res.json({ success: true, data: "PUT BILL" });
      case "DELETE":
        res.status(200);
        return res.json({ success: true, data: "DELETE BILL" });
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
