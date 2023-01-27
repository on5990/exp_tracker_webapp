import categoryService from "@/services/category.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query } = req;
    let id = query.id;
    const validId = mongoose.Types.ObjectId.isValid(id as string);
    if (!validId) {
      res.status(400);
      return res.json({ success: false, error: "Invalid id" });
    }
    switch (method) {
      case "DELETE":
        const cat = await categoryService.getOne(id as string);
        if (!cat || cat.isDefault) {
          res.status(404);
          return res.json({ success: false, error: "Category not found" });
        }
        const dbRes = await categoryService.remove(id as string);
        res.status(200);
        return res.json({
          success: true,
          data: { category: dbRes, msg: `${id} was deleted` },
        });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default handler;
