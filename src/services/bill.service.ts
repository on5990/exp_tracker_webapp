import { MONTHLY_FIXED, MONTHLY_UND, MONTH, YEAR } from "@/global/constants";
import billRepository from "@/repositories/bill.repository";

async function getOne(id: string) {
  const bill = await billRepository.getOne(id);
  return bill;
}
// PENDIENTE
async function getAll(userId: string) {
  const bills = await billRepository.getAll(userId);
  return bills;
}
// PENDIENTE
async function create(data: any) {
  const bill = await billRepository.create(data);
  return bill;
}
// PENDIENTE
async function update(id: string, data: any) {
  const res = await billRepository.update(id, data);
  return res;
}
// PENDIENTE
async function remove(id: string) {
  const res = await billRepository.remove(id);
  return res;
}
export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
