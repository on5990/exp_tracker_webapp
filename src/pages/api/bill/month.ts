import { NextApiRequest, NextApiResponse } from "next";
async function month(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case "GET":
        // GET EXPENSES BY MONTH
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: "BILL MONTH INFO" });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default month;
