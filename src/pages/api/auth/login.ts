import dbConnect from "@/lib/backendHelpers/dbConnect";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { decryptData } from "@/lib/backendHelpers/decryptData";
import authService from "@/services/auth.service";
import { setCookie } from "cookies-next";
import JWT from "@/lib/backendHelpers/JWT";
import authValidation from "@/lib/validations/auth.validation";

const cookieAge = 2592000;

async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    await dbConnect();
    switch (method) {
      case "POST":
        await authValidation.authSchema.validateAsync(body);
        const { encryptedData } = body;
        const jsonData = decryptData(encryptedData);
        const { email, password } = jsonData;
        const user = await authService.findUser(email);
        if (!user) {
          res.status(404);
          return res.json({ success: false, error: "User not found" });
        }
        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
          res.status(401);
          return res.json({ success: false, error: "Password incorrect" });
        } else {
          const accessToken = await JWT.createToken(user);
          setCookie("access-token", accessToken, {
            req,
            res,
            maxAge: cookieAge,
            httpOnly: false,
          });
          res.status(200);
          return res.json({
            success: true,
            data: { msg: `${user.email} logged in` },
          });
        }
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default login;
