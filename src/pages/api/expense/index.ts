import expenseValidation from "@/lib/validations/expense.validation";
import { NextApiRequest, NextApiResponse } from "next";

async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    switch (method) {
      case "GET":
        // const {headers} = req;
        // const payload =
        //   headers.payload && JSON.parse(headers.payload as string);
        // console.log("PAYLOAD", payload);
        res.status(200);
        return res.json({ success: true, data: "GET EXPENSE" });
      case "POST":
        await expenseValidation.addSchema.validateAsync(body);
        res.status(200);
        return res.json({ success: true, data: "POST EXPENSE" });
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
