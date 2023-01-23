import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
function createToken(user: any) {
  const accessToken = sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET as string
  );
}
