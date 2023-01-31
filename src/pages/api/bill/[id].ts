import { BILL_ACTIVE, BILL_FINISHED, BILL_OVERDUE } from "@/global/constants";
import billValidation from "@/lib/backendHelpers/validations/bill.validation";
import billService from "@/services/bill.service";
import mathService from "@/services/math.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
interface Data {
  description: string;
  sum?: number;
  type: string;
  firstPayment?: Date;
  amount?: number;
  payments?: number;
  nextPayment?: Date;
  lastPayment?: Date;
  _userId?: string;
  state?: string;
  finalPayment?: Date;
}
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
        await billValidation.updateSchema.validateAsync(body);
        console.log(body);
        // PREPARE DATA
        const { description, sum, amount } = body;
        let data: Data = { ...bill._doc };
        data = { ...data, description: description };
        if (body.sum) data = { ...data, sum: sum };
        if (body.amount) data = { ...data, amount: amount };
        // CALC NEXT_PAYMENT
        if (amount <= bill.payments) {
          data = { ...data, nextPayment: data.lastPayment };
        }
        // const next = mathService.calcLastPayment()
        // CALC FINAL_PAYMENT
        const finalPayment = mathService.calcFinalPayment(
          data.firstPayment as Date,
          data.amount as number,
          data.type
        );
        data = { ...data, finalPayment: finalPayment };
        // DETERMINE STATE
        let state = BILL_ACTIVE;
        if (data.payments == data.amount) {
          state = BILL_FINISHED;
          data = { ...data, nextPayment: data.lastPayment };
        } else if (
          data.nextPayment &&
          new Date().getTime() > new Date(data.nextPayment).getTime()
        ) {
          state = BILL_OVERDUE;
        }
        data = { ...data, state };
        console.log("UPDATE DATA", data);
        // UPDATE
        await billService.update(id, data);
        // GET ALL THE BILLS
        const bills = await billService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: { bills },
        });
      case "DELETE":
        // DELETE
        const dbDelete = await billService.remove(id);
        // GET BILLS
        const _bills = await billService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: { msg: `${dbDelete._id} was deleted`, bills: _bills },
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
