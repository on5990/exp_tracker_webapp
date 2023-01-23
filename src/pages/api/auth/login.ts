import { NextApiRequest, NextApiResponse } from "next";
async function login(req: NextApiRequest, res: NextApiResponse) {
  const { password, email } = req.body;
  res.status(200).json({ name: "John Doe" });
}
export default login;
