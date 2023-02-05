import categoryRepository from "@/repositories/category.repository";

// PENDIENTE
async function getOne(id: string) {
  const category = await categoryRepository.getOne(id);
  return category;
}
// PENDIENTE
async function getAll(userId: string) {
  const categories = await categoryRepository.getAll(userId);
  return categories;
}
// PENDIENTE
async function createDefault(name: string) {
  const data = { name, isDefault: true };
  const category = await categoryRepository.create(data);
  return category;
}
async function createCustom(name: string, userId: string) {
  const data = { name, isDefault: false, _userId: userId };
  const category = await categoryRepository.create(data);
  return category;
}
// PENDIENTE
async function remove(id: string) {
  const res = await categoryRepository.remove(id);
  return res;
}
async function exists(_userId: string, name: string) {
  const res = await categoryRepository.exists(_userId, name);
  return res;
}
async function getByName(name: string) {
  const found = await categoryRepository.getByName(name);
  return found;
}
export default {
  getOne,
  getAll,
  getByName,
  createDefault,
  createCustom,
  remove,
  exists,
};
