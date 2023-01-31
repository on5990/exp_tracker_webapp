import Budget from "@/models/Budget";

async function getOne(id: string) {
  try {
    const budget = await Budget.findById(id).exec();
    return budget;
  } catch (error) {
    console.log(error);
  }
}
async function getByCategory(_categoryId: string) {
  try {
    const budget = await Budget.findOne({ _categoryId }).exec();
    return budget;
  } catch (error) {
    console.log(error);
  }
}
// FIND BUDGETS
async function getAll(userId: string) {
  try {
    const budgets = await Budget.find({ _userId: userId }).exec();
    return budgets;
  } catch (error) {
    console.log(error);
  }
}
// CREATE BUDGET
async function create(data: any) {
  try {
    const budget = await Budget.create({ ...data });
    return budget;
  } catch (error) {
    console.log(error);
  }
}
// UPDATE BUDGET
async function update(id: string, data: any) {
  try {
    const res = await Budget.findByIdAndUpdate(id, { ...data });
    return res;
  } catch (error) {
    console.log(error);
  }
}
// DELETE BUDGET
async function remove(id: string) {
  try {
    const res = await Budget.findByIdAndRemove(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll, getOne, getByCategory, create, update, remove };
