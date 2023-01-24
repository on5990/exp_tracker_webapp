import User from "@/models/User";
import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(user: any) {
  const accessToken = sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET as string
  );
  return accessToken;
}
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
export default { createToken, createUser, findUser };
