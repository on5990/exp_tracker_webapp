import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/backendHelpers/dbConnect";
import User from "@/models/User";
import { decryptData } from "@/lib/backendHelpers/decryptData";
import authService from "@/services/auth.service";

async function signup(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { encryptedData } = body;
  await dbConnect();
  if (method === "POST") {
    try {
      const jsonData = decryptData(encryptedData);
      const userExist = await authService.findUser(jsonData.email);
      if (userExist) {
        res.status(409);
        return res.json({ success: false, error: "Usuario ya existe" });
      }
      const hashedPass = await bcrypt.hash(jsonData.password, 10);
      const user = await authService.createUser(jsonData.email, hashedPass);
      return res
        .status(200)
        .json({ success: true, data: { email: user.email } });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
  return res.status(400).json({ success: false, error: "Ruta inválida" });
}
export default signup;
