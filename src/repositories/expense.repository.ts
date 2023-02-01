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
    const expenses = await Expense.find({ _userId: userId })
      .sort({ spentAt: -1 })
      .exec();
    return expenses;
  } catch (error) {
    console.log(error);
  }
}
// FIND EXPENSES ASSOCIATED TO A CATEGORY
async function getByCategory(_userId: string, _categoryId: string) {
  try {
    const expenses = await Expense.find({ _userId, _categoryId })
      .sort({ spentAt: -1 })
      .exec();
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
async function removeByCategoryId(_categoryId: string) {
  try {
    const res = await Expense.updateMany(
      { _categoryId },
      { _categoryId: null }
    );
  } catch (error) {
    console.log(error);
  }
}
export default {
  getAll,
  getOne,
  getByCategory,
  create,
  update,
  remove,
  removeByCategoryId,
};
