import { NextApiRequest, NextApiResponse } from "next";

async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, headers } = req;
    if (method === "GET") {
      const payload = headers.payload && JSON.parse(headers.payload as string);
      console.log("PAYLOAD", payload);
    }
    res.status(200);
    return res.json({ success: true });
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default index;
