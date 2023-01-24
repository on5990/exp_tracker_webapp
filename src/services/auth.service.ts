import User from "@/models/User";

async function createUser(email: string, password: string) {
  try {
    return await User.create({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
}
async function findUser(email: string) {
  try {
    return await User.findOne({ email }).exec();
  } catch (error) {
    console.log(error);
  }
}
export default { createUser, findUser };
