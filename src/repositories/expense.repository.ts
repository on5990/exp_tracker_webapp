import Expense from "@/models/Expense";
async function getOne(id: string) {
  try {
    const expense = await Expense.findById(id).exec();
    return expense;
  } catch (error) {
    console.log(error);
  }
}
// FIND EXPENSES
async function getAll(userId: string) {
  try {
    const expenses = await Expense.find({ _userId: userId }).exec();
    return expenses;
  } catch (error) {
    console.log(error);
  }
}
// CREATE EXPENSE
async function create(data: any) {
  try {
    const expense = await Expense.create({ ...data });
    return expense;
  } catch (error) {
    console.log(error);
  }
}
// UPDATE EXPENSE
async function update(id: string, data: any) {
  try {
    const res = await Expense.findByIdAndUpdate(id, { ...data });
    return res;
  } catch (error) {
    console.log(error);
  }
}
// DELETE EXPENSE
async function remove(id: string) {
  try {
    const res = await Expense.findByIdAndRemove(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll, getOne, create, update, remove };
