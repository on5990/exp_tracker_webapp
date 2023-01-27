import billValidation from "@/lib/validations/bill.validation";
import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    switch (method) {
      case "POST":
        await billValidation.paySchema.validateAsync(body);
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
export default index;
