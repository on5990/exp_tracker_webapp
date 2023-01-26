import { NextApiRequest, NextApiResponse } from "next";

async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case "GET":
        // const {headers} = req;
        // const payload =
        //   headers.payload && JSON.parse(headers.payload as string);
        // console.log("PAYLOAD", payload);
        res.status(200);
        return res.json({ success: true, data: "GET EXPENSE" });
      case "POST":
        res.status(200);
        return res.json({ success: true, data: "POST EXPENSE" });
      case "PUT":
        res.status(200);
        return res.json({ success: true, data: "PUT EXPENSE" });
      case "DELETE":
        res.status(200);
        return res.json({ success: true, data: "DELETE EXPENSE" });
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
