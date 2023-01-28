import billValidation from "@/lib/backendHelpers/validations/bill.validation";
import billService from "@/services/bill.service";
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
        const { description, sum, type, firstPayment, amount, payments } = body;
        let data: Data = { description, type };
        if (sum) data = { ...data, sum };
        if (firstPayment) data = { ...data, firstPayment };
        if (amount) data = { ...data, amount };
        if (payments) data = { ...data, payments };
        const last = billService.lastPayment(firstPayment, payments, type);
        if (last) data = { ...data, lastPayment: last };
        const next = billService.lastPayment(last, 1, type);
        if (next) data = { ...data, nextPayment: next };
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
