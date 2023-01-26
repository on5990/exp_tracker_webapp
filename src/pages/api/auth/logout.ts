import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case "DELETE":
        deleteCookie("access-token", { req, res });
        res.status(200);
        return res.json({ success: true, msg: "Sesión terminada" });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default logout;
