import categoryService from "@/services/category.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    const id = query.id?.toString() || "";
    // CHECK IF THE ID IS VALID
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      res.status(400);
      return res.json({ success: false, error: "Invalid id" });
    }
    // CHECK IF CATEGORY EXISTS
    const category = await categoryService.getOne(id);
    if (!category || category.isDefault) {
      res.status(404);
      return res.json({ success: false, error: "Category not found" });
    }
    switch (method) {
      case "DELETE":
        // DELETE
        const dbRes = await categoryService.remove(id);
        // DELETE BUDGETS ASSOCIATED TO THIS CATEGORY
        // UPDATE _categoryId TO NULL FOR EXPENSES ASSOCIATED TO THIS CATEGORY
        // GET CATEGORIES
        const categories = await categoryService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: { categories, msg: `${id} was deleted` },
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
