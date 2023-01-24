import { JwtPayload, sign, verify } from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyToken(token: any) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return verified.payload;
  } catch (error) {
    console.log(error);
  }
}
async function createToken(user: any) {
  try {
    const accessToken = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30 days")
      .sign(new TextEncoder().encode(JWT_SECRET));
    return accessToken;
  } catch (error) {
    console.log(error);
  }
}
export default { verifyToken, createToken };
