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
    const categories = await Category.find({
      $or: [{ _userId: userId }, { isDefault: true }],
    }).exec();
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
async function createBillCategory() {
  let category = await Category.findOne({ name: "Cuentas" }).exec();
  if (!category) {
    category = await Category.create({ name: "Cuentas", isDefault: true });
  }
  return category;
}
async function exists(_userId: string, name: string) {
  let found = await Category.find({
    $or: [
      { _userId, name },
      { name, isDefault: true },
    ],
  });
  return found.length > 0 ? true : false;
}
export default { getAll, getOne, create, createBillCategory, remove, exists };
