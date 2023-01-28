import categoryValidation from "@/lib/validations/category.validation";
import categoryService from "@/services/category.service";
import { NextApiRequest, NextApiResponse } from "next";
async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    switch (method) {
      case "POST":
        await categoryValidation.addSchema.validateAsync(body);
        const category = await categoryService.createCustom(body.name, userId);
        // const category = await categoryService.createDefault(body.name);
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
