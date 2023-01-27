import categoryRepository from "@/repositories/category.repository";
import mongoose from "mongoose";

// PENDIENTE
async function getOne(id: mongoose.Types.ObjectId) {
  const category = await categoryRepository.getOne(id);
  return category;
}
// PENDIENTE
async function getAll(userId: mongoose.Types.ObjectId) {
  const categories = await categoryRepository.getAll(userId);
  return categories;
}
// PENDIENTE
async function create(data: any) {
  const category = await categoryRepository.create(data);
  return category;
}
// PENDIENTE
async function remove(id: mongoose.Types.ObjectId) {
  const res = await categoryRepository.remove(id);
  return res;
}
export default { getOne, getAll, create, remove };
