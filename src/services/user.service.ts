import userRepository from "@/repositories/user.repository";

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
export default { create, getByEmail, getById, update };
