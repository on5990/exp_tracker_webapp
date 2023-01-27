import Bill from "@/models/Bill";
import mongoose from "mongoose";
// FIND BILLS
// PENDIENTE
async function findBills(userId: mongoose.Types.ObjectId) {
  try {
  } catch (error) {
    console.log(error);
  }
}
// CREATE BILL
// PENDIENTE
async function createBill(data: any) {
  try {
  } catch (error) {
    console.log(error);
  }
}
// UPDATE BILL
// PENDIENTE
async function updateBill(data: any) {
  try {
  } catch (error) {
    console.log(error);
  }
}
// DELETE BILL
// PENDIENTE
async function deleteBill(id: mongoose.Types.ObjectId) {
  try {
  } catch (error) {
    console.log(error);
  }
}
// PAY BILL
// PENDIENTE
async function payBill(id: mongoose.Types.ObjectId) {
  try {
  } catch (error) {
    console.log(error);
  }
}
export default { findBills, createBill, updateBill, deleteBill, payBill };
