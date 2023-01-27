import Budget from "@/models/Budget";
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
export default { getAll, create, update, remove };
