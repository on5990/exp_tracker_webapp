import { NextApiRequest, NextApiResponse } from "next";
async function pay(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, headers } = req;
    res.status(200);
    return res.json({ success: true });
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default pay;
