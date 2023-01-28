import budgetRepository from "@/repositories/budget.repository";

async function getOne(id: string) {
  const budget = await budgetRepository.getOne(id);
  return budget;
}
// PENDIENTE
async function getAll(userId: string) {
  const budgets = await budgetRepository.getAll(userId);
  return budgets;
}
// PENDIENTE
async function create(data: any) {
  const budget = await budgetRepository.create(data);
  return budget;
}
// PENDIENTE
async function update(id: string, data: any) {
  const res = await budgetRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: string) {
  const res = await budgetRepository.remove(id);
  return res;
}
export default { getAll, getOne, create, update, remove };
