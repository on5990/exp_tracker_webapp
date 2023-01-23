import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

// type Data = {
//   name: string;
// };

async function signup(req: NextApiRequest, res: NextApiResponse) {
  const { password, email } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  console.log("XXXXXXXXX", req.body);
  res.status(200).json({ name: "John Doe" });
}
export default signup;
