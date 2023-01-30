import {
  ACT_CREATE,
  ACT_UPDATE,
  BILL_ACTIVE,
  BILL_FINISHED,
  BILL_OVERDUE,
} from "@/global/constants";
import billValidation from "@/lib/backendHelpers/validations/bill.validation";
import billService from "@/services/bill.service";
import mathService from "@/services/math.service";
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
}

async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    switch (method) {
      case "GET":
        // GET BILLS
        const bills = await billService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: { bills } });
      case "POST":
        // VALIDATE DATA FROM FRONTEND
        await billValidation.addSchema.validateAsync(body);
        // PREPARE DATA
        console.log("BODY", body);
        const { description, sum, type, firstPayment, amount, payments } = body;
        let data: Data = { description, type, _userId: userId };
        if (sum) data = { ...data, sum };
        if (firstPayment) data = { ...data, firstPayment };
        if (amount) data = { ...data, amount };
        if (payments) data = { ...data, payments };
        let last = null;
        if (firstPayment && payments == "1") {
          last = firstPayment;
        } else {
          last = mathService.calcLastPayment(
            firstPayment,
            payments,
            type,
            ACT_CREATE
          );
        }
        if (last) data = { ...data, lastPayment: last };
        console.log("BBBB", data.lastPayment);
        const next = mathService.calcLastPayment(
          data.lastPayment,
          1,
          type,
          ACT_UPDATE
        );
        if (next) data = { ...data, nextPayment: next };
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
        console.log("REQ DATA", data);
        // const input =
        // CREATE BILL
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: "POST BILL" });
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
