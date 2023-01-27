import expenseRepository from "@/repositories/expense.repository";

async function getOne(id: string) {
  const expense = await expenseRepository.getOne(id);
  return expense;
}

// PENDIENTE
async function getAll(userId: string) {
  const expenses = await expenseRepository.getAll(userId);
  return expenses;
}
// PENDIENTE
async function create(data: any) {
  const expense = await expenseRepository.create(data);
  return expense;
}
// PENDIENTE
async function update(id: string, data: any) {
  const res = await expenseRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: string) {
  const res = await expenseRepository.remove(id);
  return res;
}
export default { getAll, getOne, create, update, remove };
