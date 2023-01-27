import Category from "@/models/Category";

// FIND CATEGORY
async function getOne(id: string) {
  try {
    const category = await Category.findById(id).exec();
    return category;
  } catch (error) {
    console.log(error);
  }
}
// FIND CATEGORIES
async function getAll(userId: string) {
  try {
    const categories = await Category.find({ _userId: userId }).exec();
    return categories;
  } catch (error) {
    console.log(error);
  }
}
// CREATE CATEGORY
async function create(data: any) {
  try {
    const category = await Category.create({ ...data });
    return category;
  } catch (error) {
    console.log(error);
  }
}
// DELETE CATEGORY
async function remove(id: string) {
  try {
    const res = await Category.findByIdAndRemove(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll, getOne, create, remove };
