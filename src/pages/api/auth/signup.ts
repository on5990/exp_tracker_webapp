import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// type Data = {
//   name: string;
// };

async function signup(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { password, email } = body;
  await dbConnect();
  if (method === "POST") {
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPass });
      return res.status(200).json({ success: true, data: { user } });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
  console.log("XXXXXXXXX", req.body);
  res.status(200).json({ name: "John Doe" });
}
export default signup;
