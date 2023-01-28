import {
  MONTHLY_FIXED,
  MONTHLY_UND,
  ST_MONTH,
  ST_YEAR,
} from "@/global/constants";
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
function lastPayment(prevPayment: any, payments: number, type: string) {
  if (!prevPayment || !payments || !type) {
    return false;
  }
  const timeType = MONTHLY_FIXED || MONTHLY_UND ? ST_MONTH : ST_YEAR;
  let year, month;
  if (timeType === ST_MONTH) {
    month = prevPayment.getMonth() + payments;
    year = prevPayment.getFullYear();
    if (month > 11) {
      year = year + Math.floor(month / 12);
      month = month % 12;
    }
    return new Date(`${year}-${month + 1}-01`);
  } else {
    year = prevPayment.getFullYear() + payments;
    return new Date(`${year}-01-01`);
  }
}
// PENDIENTE
function state(lastPayment: Date, nextPayment: Date, type: string) {
  if (!lastPayment || !nextPayment || !type) {
    return false;
  }
  const timeType = MONTHLY_FIXED || MONTHLY_UND ? ST_MONTH : ST_YEAR;
  if (timeType === ST_MONTH) {
    // FINISHED
    // OVERDUE
    // OK
  } else {
    // FINISHED
    // OVERDUE
    // OK
  }
}
export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  lastPayment,
  state,
};
