import Budget from "@/models/Budget";
import mongoose from "mongoose";
// FIND BUDGETS
async function getAll(userId: mongoose.Types.ObjectId) {
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
async function update(id: mongoose.Types.ObjectId, data: any) {
  try {
    const res = await Budget.findByIdAndUpdate(id, { ...data });
    return res;
  } catch (error) {
    console.log(error);
  }
}
// DELETE BUDGET
async function remove(id: mongoose.Types.ObjectId) {
  try {
    const res = await Budget.findByIdAndRemove(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll, create, update, remove };
