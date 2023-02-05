import {
  MONTHLY_FIXED,
  MONTHLY_UND,
  MONTH,
  YEAR,
  BILL_OVERDUE,
  BILL_FINISHED,
  BILL_ACTIVE,
} from "@/global/constants";
import billRepository from "@/repositories/bill.repository";
import { AnyARecord } from "dns";
import mathService from "./math.service";
interface RevInput {
  lastPayment: Date | null;
  nextPayment: Date | null;
  state?: string;
  payments: number;
}
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
async function reversePayment(userId: string, expense: any) {
  const bill = await billRepository.getOne(expense._billId);
  let data: RevInput = mathService.calcReversePayment(bill, expense.payments);
  if (bill.payments == 1) {
    data = {
      ...data,
      lastPayment: null,
      nextPayment: bill.firstPayment,
    };
  }
  let state = BILL_ACTIVE;
  if (data.payments >= bill.amount) {
    state = BILL_FINISHED;
  } else if (
    new Date().getTime() > new Date(data.nextPayment as Date).getTime()
  ) {
    state = BILL_OVERDUE;
  }
  data = { ...data, state };
  await billRepository.update(bill._id, data);
  // GET BILLS
  const bills = await billRepository.getAll(userId);
  const monthTotal = mathService.calcBillMonth(bills || []);
  const yearTotal = mathService.calcBillYear(bills || []);
  const output = { bills, monthTotal, yearTotal };
  return output;
}
export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  reversePayment,
};
