import userRepository from "@/repositories/user.repository";
import mongoose from "mongoose";

async function createUser(email: string, password: string) {
  const user = await userRepository.createUser(email, password);
  return user;
}
async function findUserByEmail(email: string) {
  return await userRepository.findUserByEmail(email);
}
async function findUserById(id: mongoose.Types.ObjectId) {
  return await userRepository.findUserById(id);
}
// PENDIENTE
async function updateUser(data: any) {}
export default { createUser, findUserByEmail, findUserById, updateUser };
