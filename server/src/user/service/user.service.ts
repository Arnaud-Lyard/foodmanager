import { Prisma, PrismaClient, User } from '@prisma/client';
import { Request } from 'express';
import fs from 'fs-extra';
import { signJwt } from '../../utils/jwt';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { IUserSafe } from '../../types/user';

const prisma = new PrismaClient();

export const createUser = async (user: UserDto) => {
  return await UserRepository.createUser(user);
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
  const access_token = signJwt(
    { sub: user.id },
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
    }
  );

  return { access_token };
};

export async function findUniqueUser(
  userId: string
): Promise<IUserSafe | null> {
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

export async function getTeamUsers() {
  return await UserRepository.getTeamUsers();
}

export async function updateUser({
  req,
  user,
  twitter,
  esl,
  pseudo,
  email,
  file,
}: {
  req: Request;
  user: User;
  twitter?: string;
  esl?: string;
  pseudo: string;
  email: string;
  file: Express.Multer.File | undefined;
}) {
  await removeUnusedFiles({ user, file });
  const avatarUrl = await getAvatarUrl({ user, req, file });

  return await UserRepository.updateUser({
    userId: user.id,
    twitter,
    esl,
    pseudo,
    email,
    avatar: avatarUrl,
  });
}

async function removeUnusedFiles({
  user,
  file,
}: {
  user: User;
  file: Express.Multer.File | undefined;
}) {
  if (!file) return;
  if (user.avatar) {
    const fileName = user.avatar?.split('/uploads/')[1];
    await fs.unlink(`public/uploads/${fileName}`);
  }
}

async function getAvatarUrl({
  user,
  req,
  file,
}: {
  user: User;
  req: Request;
  file: Express.Multer.File | undefined;
}) {
  if (!file) return user.avatar;
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
}
