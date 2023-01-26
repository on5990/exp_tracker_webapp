import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case "GET":
        res.status(200);
        return res.json({ success: true, data: "GET BILLS" });
      case "POST":
        res.status(200);
        return res.json({ success: true, data: "POST BILL" });
      case "PUT":
        res.status(200);
        return res.json({ success: true, data: "PUT BILL" });
      case "DELETE":
        res.status(200);
        return res.json({ success: true, data: "DELETE BILL" });
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
