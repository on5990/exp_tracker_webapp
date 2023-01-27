import userRepository from "@/repositories/user.repository";
import mongoose from "mongoose";

async function create(email: string, password: string) {
  const user = await userRepository.create(email, password);
  return user;
}
async function getByEmail(email: string) {
  return await userRepository.getByEmail(email);
}
async function getById(id: mongoose.Types.ObjectId) {
  return await userRepository.getById(id);
}
// PENDIENTE
async function update(id: mongoose.Types.ObjectId, data: any) {
  const res = await userRepository.update(id, data);
  return res;
}
export default { create, getByEmail, getById, update };