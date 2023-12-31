import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_ACCESS_TOKEN } from "../const";
import { TokenPublicKeyName } from "../types/auth";

export const signJwt = (payload: Object, options: SignOptions) => {
  const key = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
  const privateKey = Buffer.from(key, "base64").toString("ascii");

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: TokenPublicKeyName
): T | null => {
  try {
    let key = "";
    switch (keyName) {
      case JWT_ACCESS_TOKEN.PUBLIC_KEY:
        key = process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY;
        break;
    }
    const publicKey = Buffer.from(key, "base64").toString("ascii");
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
