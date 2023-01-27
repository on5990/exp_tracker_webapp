import Bill from "@/models/Bill";
import mongoose from "mongoose";
// FIND BILLS
async function getAll(userId: mongoose.Types.ObjectId) {
  try {
    const bills = await Bill.find({ _userId: userId }).exec();
    return bills;
  } catch (error) {
    console.log(error);
  }
}
// CREATE BILL
async function create(data: any) {
  try {
    const bill = await Bill.create({ ...data });
    return bill;
  } catch (error) {
    console.log(error);
  }
}
// UPDATE BILL
async function update(id: mongoose.Types.ObjectId, data: any) {
  try {
    const res = await Bill.findByIdAndUpdate(id, { ...data });
    return res;
    return res;
  } catch (error) {
    console.log(error);
  }
}
// DELETE BILL
async function remove(id: mongoose.Types.ObjectId) {
  try {
    const res = await Bill.findByIdAndRemove(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll, create, update, remove };
