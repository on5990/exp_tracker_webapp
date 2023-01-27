import billRepository from "@/repositories/bill.repository";
import mongoose from "mongoose";

// PENDIENTE
async function getAll(userId: mongoose.Types.ObjectId) {
  const bills = await billRepository.getAll(userId);
  return bills;
}
// PENDIENTE
async function create(data: any) {
  const bill = await billRepository.create(data);
  return bill;
}
// PENDIENTE
async function update(id: mongoose.Types.ObjectId, data: any) {
  const res = await billRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: mongoose.Types.ObjectId) {
  const res = await billRepository.remove(id);
  return res;
}
export default { getAll, create, update, remove };
