import Expense from "@/models/Expense";
import mongoose from "mongoose";
// FIND EXPENSES
async function getAll(userId: mongoose.Types.ObjectId) {
  try {
    const expenses = await Expense.find({ _userId: userId }).exec();
    return expenses;
  } catch (error) {
    console.log(error);
  }
}
// CREATE EXPENSE
async function create(data: any) {
  try {
    const expense = await Expense.create({ ...data });
    return expense;
  } catch (error) {
    console.log(error);
  }
}
// UPDATE EXPENSE
async function update(id: mongoose.Types.ObjectId, data: any) {
  try {
    const res = await Expense.findByIdAndUpdate(id, { ...data });
    return res;
  } catch (error) {
    console.log(error);
  }
}
// DELETE EXPENSE
async function remove(id: mongoose.Types.ObjectId) {
  try {
    const res = await Expense.findByIdAndRemove(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll, create, update, remove };
