import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/backendHelpers/dbConnect";
import User from "@/models/User";
import { decryptData } from "@/lib/backendHelpers/decryptData";

async function signup(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { encryptedData } = body;
  await dbConnect();
  if (method === "POST") {
    try {
      const jsonData = decryptData(encryptedData);
      const hashedPass = await bcrypt.hash(jsonData.password, 10);
      const user = await User.create({
        email: jsonData.email,
        password: hashedPass,
      });
      return res
        .status(200)
        .json({ success: true, data: { email: user.email } });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
  return res.status(400).json({ success: false, error: "Invalid route" });
}
export default signup;
