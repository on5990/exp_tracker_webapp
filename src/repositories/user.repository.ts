import User from "@/models/User";
import mongoose from "mongoose";

async function create(email: string, password: string) {
  try {
    return await User.create({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getByEmail(email: string) {
  try {
    return await User.findOne({ email }).exec();
  } catch (error) {
    console.log(error);
  }
}
async function getById(id: mongoose.Types.ObjectId) {
  try {
    return await User.findById(id).exec();
  } catch (error) {
    console.log(error);
  }
}
async function update(id: mongoose.Types.ObjectId, data: any) {
  try {
    const res = await User.findByIdAndUpdate(id, { ...data });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { create, getByEmail, getById, update };
