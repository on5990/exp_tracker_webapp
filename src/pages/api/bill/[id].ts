import billValidation from "@/lib/backendHelpers/validations/bill.validation";
import billService from "@/services/bill.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

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
    // CHECK IF BILL EXISTS
    const bill = await billService.getOne(id);
    if (!bill) {
      res.status(404);
      return res.json({ success: false, error: "Bill not found" });
    }
    switch (method) {
      case "PUT":
        // VALIDATE INPUT FROM FRONTEND
        await billValidation.addSchema.validateAsync(body);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: "PUT BILL" });
      case "DELETE":
        // DELETE
        const dbDelete = await billService.remove(id);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: { msg: `${dbDelete._id} was deleted`, bill: dbDelete },
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
