import { NextApiRequest, NextApiResponse } from "next";

async function denyRequest(req: NextApiRequest, res: NextApiResponse) {
  res.status(401);
  return res.json({
    success: false,
    error: "Invalid or non existent access token",
  });
}
export default denyRequest;
