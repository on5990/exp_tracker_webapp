import userRepository from "@/repositories/user.repository";
import mathService from "./math.service";

async function create(email: string, password: string) {
  const user = await userRepository.create(email, password);
  return user;
}
async function getByEmail(email: string) {
  return await userRepository.getByEmail(email);
}
async function getById(id: string) {
  return await userRepository.getById(id);
}
async function update(id: string, data: any) {
  const res = await userRepository.update(id, data);
  return res;
}
async function updateAvg(userId: string, _expenses: any) {
  const { monthAvg, yearAvg } = mathService.calcExpenseAvg(
    _expenses.expenses as Array<any>
  );
  await userRepository.update(userId, {
    monthlyAvg: monthAvg,
    yearlyAvg: yearAvg,
  });
  return { monthAvg, yearAvg };
}
export default { create, getByEmail, getById, update, updateAvg };
