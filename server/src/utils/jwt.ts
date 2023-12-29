import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPrivateKeyName, TokenPublicKeyName } from "../types/auth";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "../const";

export const signJwt = (
  payload: Object,
  keyName: TokenPrivateKeyName,
  options: SignOptions
) => {
  let key = "";
  switch (keyName) {
    case JWT_ACCESS_TOKEN.PRIVATE_KEY:
      key = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
      break;
    case JWT_REFRESH_TOKEN.PRIVATE_KEY:
      key = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
      break;
  }
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
      case JWT_REFRESH_TOKEN.PUBLIC_KEY:
        key = process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY;
        break;
    }
    const publicKey = Buffer.from(key, "base64").toString("ascii");
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
