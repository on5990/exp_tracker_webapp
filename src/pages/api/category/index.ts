import categoryValidation from "@/lib/backendHelpers/validations/category.validation";
import categoryService from "@/services/category.service";
import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    switch (method) {
      case "GET":
        // GET CATEGORIES
        const categories = await categoryService.getAll(userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: { categories } });
      case "POST":
        // VALIDATE DATA FROM FRONTEND
        await categoryValidation.addSchema.validateAsync(body);
        // CHECK IF CATEGORY EXISTS: SAME USER_ID AND NAME || SAME NAME AND IS_DEFAULT:TRUE
        const exists = await categoryService.exists(userId, body.name);
        if (exists) {
          res.status(409);
          return res.json({
            success: false,
            error: "This category already exists",
          });
        }
        // GET CATEGORY
        const category = await categoryService.createCustom(body.name, userId);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({ success: true, data: { category } });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default index;
