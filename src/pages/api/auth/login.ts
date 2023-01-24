import dbConnect from "@/lib/backendHelpers/dbConnect";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { decryptData } from "@/lib/backendHelpers/decryptData";
import authService from "@/services/auth.service";
import { setCookie, getCookie } from "cookies-next";
import JWT from "@/lib/backendHelpers/JWT";

const cookieAge = 2592000;

async function login(req: NextApiRequest, res: NextApiResponse) {
  const cookie = getCookie("access-token", { req, res });
  const { method, body } = req;
  const { encryptedData } = body;
  await dbConnect();
  console.log("AA");
  if (method === "POST") {
    try {
      const jsonData = decryptData(encryptedData);
      console.log("A2");
      const { email, password } = jsonData;
      const user = await authService.findUser(email);
      console.log("A3");
      if (!user) {
        res.status(404);
        return res.json({ success: false, error: "User not found" });
      }
      const correctPass = await bcrypt.compare(password, user.password);
      console.log("A4");
      if (!correctPass) {
        res.status(401);
        return res.json({ success: false, error: "Password incorrect" });
      } else {
        console.log("A5");
        const accessToken = await JWT.createToken(user);
        console.log("A6", accessToken);
        setCookie("access-token", accessToken, {
          req,
          res,
          maxAge: cookieAge,
          httpOnly: false,
        });
        console.log("XXXXXXXXXXX", user.id, accessToken, req.url);
        res.status(200);
        res.json({ success: true, data: { email } });
      }
    } catch (error) {
      res.status(400);
      return res.json({ success: false, error });
    }
  }
}
export default login;
