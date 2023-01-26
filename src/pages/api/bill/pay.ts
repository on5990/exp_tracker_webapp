import { NextApiRequest, NextApiResponse } from "next";
async function pay(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case "POST":
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
export default pay;
