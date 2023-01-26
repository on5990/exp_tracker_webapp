import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, headers } = req;
    switch (method) {
      case "POST":
        res.status(200);
        return res.json({ success: true, data: "POST CATEGORY" });
      case "DELETE":
        res.status(200);
        return res.json({ success: true, data: "DELETE CATEGORY" });
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
