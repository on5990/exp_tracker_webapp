import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { password, email } = body;
  await dbConnect();
  if (method === "POST") {
    try {
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
  console.log(req.url);
  res.status(200).json({ name: "John Doe" });
}
export default login;
