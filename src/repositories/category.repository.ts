import Category from "@/models/Category";
import mongoose from "mongoose";
// FIND CATEGORIES
// PENDIENTE
async function findCategories(userId: mongoose.Types.ObjectId) {
  try {
  } catch (error) {
    console.log(error);
  }
}
// CREATE CATEGORY
// PENDIENTE
async function createCategory(data: any) {
  try {
  } catch (error) {
    console.log(error);
  }
}
// DELETE CATEGORY
// PENDIENTE
async function deleteCategory(id: mongoose.Types.ObjectId) {
  try {
  } catch (error) {
    console.log(error);
  }
}
export default { findCategories, createCategory, deleteCategory };
