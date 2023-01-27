import budgetValidation from "@/lib/validations/budget.validation";
import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    switch (method) {
      case "GET":
        res.status(200);
        return res.json({ success: true, data: "GET BUDGET" });
      case "POST":
        await budgetValidation.addSchema.validateAsync(body);
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
