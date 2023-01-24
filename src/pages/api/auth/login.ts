import dbConnect from "@/lib/backendHelpers/dbConnect";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { decryptData } from "@/lib/backendHelpers/decryptData";
import { json } from "stream/consumers";

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { encryptedData } = body;
  await dbConnect();
  if (method === "POST") {
    try {
      const jsonData = decryptData(encryptedData);
      const { email, password } = jsonData;
      const user = await User.findOne({ email }).exec();
      if (!user) {
        res.status(404);
        return res.json({ success: false, error: "User not found" });
      }
      const correctPass = await bcrypt.compare(password, user.password);
      if (!correctPass) {
        res.status(401);
        return res.json({ success: false, error: "Password incorrect" });
      } else {
      }
      res.status(200);
      return res.json({ success: true, data: { email } });
    } catch (error) {
      res.status(400);
      return res.json({ success: false, error });
    }
  }
}
export default login;
