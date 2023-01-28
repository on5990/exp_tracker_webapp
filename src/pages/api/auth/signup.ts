import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/backendHelpers/dbConnect";
import { decryptData } from "@/lib/backendHelpers/decryptData";
import userService from "@/services/user.service";
import authValidation from "@/lib/backendHelpers/validations/auth.validation";

async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    switch (method) {
      case "POST":
        await authValidation.authSchema.validateAsync(body);
        const { encryptedData } = body;
        await dbConnect();
        const jsonData = decryptData(encryptedData);
        const userExist = await userService.getByEmail(jsonData.email);
        if (userExist) {
          res.status(409);
          return res.json({ success: false, error: "Usuario ya existe" });
        }
        const hashedPass = await bcrypt.hash(jsonData.password, 10);
        const user = await userService.create(jsonData.email, hashedPass);
        res.status(200);
        return res.json({
          success: true,
          data: { msg: `User crated: ${user.email}` },
        });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
}
export default signup;
