import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case "GET":
        // GET EXPENSES ASSOCIATED TO THE BILL
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: "BILL HISTORY" });
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
