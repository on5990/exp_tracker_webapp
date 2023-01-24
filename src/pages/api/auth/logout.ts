import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    deleteCookie("access-token", { req, res });
    res.status(200);
    return res.json({ success: true, msg: "Sesión terminada" });
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default logout;
