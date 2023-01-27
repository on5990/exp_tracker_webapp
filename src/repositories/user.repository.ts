import User from "@/models/User";
import mongoose from "mongoose";

async function createUser(email: string, password: string) {
  try {
    return await User.create({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
}
async function findUserByEmail(email: string) {
  try {
    return await User.findOne({ email }).exec();
  } catch (error) {
    console.log(error);
  }
}
async function findUserById(id: mongoose.Types.ObjectId) {
  try {
    return await User.findOne({ _id: id }).exec();
  } catch (error) {
    console.log(error);
  }
}
// PENDIENTE
async function updateUser(id: mongoose.Types.ObjectId, data: any) {
  try {
  } catch (error) {
    console.log(error);
  }
}
export default { createUser, findUserByEmail, findUserById, updateUser };
