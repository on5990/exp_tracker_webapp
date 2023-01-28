import Bill from "@/models/Bill";

async function getOne(id: string) {
  try {
    const bill = await Bill.findById(id).exec();
    return bill;
  } catch (error) {
    console.log(error);
  }
}
// FIND BILLS
async function getAll(userId: string) {
  try {
    const bills = await Bill.find({ _userId: userId }).exec();
    return bills;
  } catch (error) {
    console.log(error);
  }
}
// CREATE BILL
async function create(data: any) {
  try {
    const bill = await Bill.create({ ...data });
    return bill;
  } catch (error) {
    console.log(error);
  }
}
// UPDATE BILL
async function update(id: string, data: any) {
  try {
    const res = await Bill.findByIdAndUpdate(id, { ...data });
    return res;
  } catch (error) {
    console.log(error);
  }
}
// DELETE BILL
async function remove(id: string) {
  try {
    const res = await Bill.findByIdAndRemove(id);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll, getOne, create, update, remove };
