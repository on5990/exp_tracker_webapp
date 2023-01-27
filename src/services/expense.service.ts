import expenseRepository from "@/repositories/expense.repository";
import mongoose from "mongoose";

// PENDIENTE
async function getAll(userId: mongoose.Types.ObjectId) {
  const expenses = await expenseRepository.getAll(userId);
  return expenses;
}
// PENDIENTE
async function create(data: any) {
  const expense = await expenseRepository.create(data);
  return expense;
}
// PENDIENTE
async function update(id: mongoose.Types.ObjectId, data: any) {
  const res = await expenseRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: mongoose.Types.ObjectId) {
  const res = await expenseRepository.remove(id);
  return res;
}
export default { getAll, create, update, remove };
