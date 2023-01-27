import budgetRepository from "@/repositories/budget.repository";
import mongoose from "mongoose";

// PENDIENTE
async function getAll(userId: mongoose.Types.ObjectId) {
  const budgets = await budgetRepository.getAll(userId);
  return budgets;
}
// PENDIENTE
async function create(data: any) {
  const budget = await budgetRepository.create(data);
  return budget;
}
// PENDIENTE
async function update(id: mongoose.Types.ObjectId, data: any) {
  const res = await budgetRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: mongoose.Types.ObjectId) {
  const res = await budgetRepository.remove(id);
  return res;
}
export default { getAll, create, update, remove };
