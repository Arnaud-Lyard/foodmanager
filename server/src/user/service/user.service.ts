import { Prisma, PrismaClient, User } from "@prisma/client";
import { signJwt } from "../../utils/jwt";
import { UserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";

const prisma = new PrismaClient();

export const createUser = async (user: UserDto) => {
  return await UserRepository.createUser(user);
};

export const findUser = async (
  where: Partial<Prisma.UserCreateInput>,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export async function switchVerificationCode({
  userId,
  verificationCode,
}: {
  userId: string;
  verificationCode: string | null;
}) {
  return await UserRepository.switchVerificationCode({
    userId,
    verificationCode,
  });
}

export async function checkIfEmailExist(email: string): Promise<User | null> {
  return await UserRepository.findByEmail(email);
}

export const signTokens = async (user: Prisma.UserCreateInput) => {
  const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, "refreshTokenPrivateKey", {
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}m`,
  });

  return { access_token, refresh_token };
};

export async function findUniqueUser(userId: string): Promise<User | null> {
  return await UserRepository.findByUserId(userId);
}

export async function findByEmail(email: string): Promise<User | null> {
  return await UserRepository.findByEmail(email);
}

export async function findUserByVerificationCode(
  verificationCode: string
): Promise<User | null> {
  return await UserRepository.findUserByVerificationCode(verificationCode);
}

export async function verifyUser(userId: string) {
  return await UserRepository.verifyUser(userId);
}

export async function updateResetPasswordToken({
  userId,
  passwordResetToken,
  passwordResetAt,
}: {
  userId: string;
  passwordResetToken: string | null;
  passwordResetAt: Date | null;
}) {
  return await UserRepository.updateResetPasswordToken({
    userId,
    passwordResetToken,
    passwordResetAt,
  });
}

export async function findUserByPasswordResetToken({
  passwordResetToken,
}: {
  passwordResetToken: string;
}) {
  return await UserRepository.findUserByPasswordResetToken(passwordResetToken);
}

export async function updateUserPassword({
  userId,
  hashedPassword,
  passwordResetToken,
  passwordResetAt,
}: {
  userId: string;
  hashedPassword: string;
  passwordResetToken: null;
  passwordResetAt: null;
}) {
  return await UserRepository.updateUserPassword({
    userId,
    hashedPassword,
    passwordResetToken,
    passwordResetAt,
  });
}
