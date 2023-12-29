import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "../const";

export type TokenPrivateKeyName =
  | typeof JWT_ACCESS_TOKEN.PRIVATE_KEY
  | typeof JWT_REFRESH_TOKEN.PRIVATE_KEY;

export type TokenPublicKeyName =
  | typeof JWT_ACCESS_TOKEN.PUBLIC_KEY
  | typeof JWT_REFRESH_TOKEN.PUBLIC_KEY;
