import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (payload: Object, options: SignOptions) => {
  const key = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
  const privateKey = Buffer.from(key, "base64").toString("ascii");

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const key = process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY;
    const publicKey = Buffer.from(key, "base64").toString("ascii");
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
