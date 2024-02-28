import { Prisma, PrismaClient, User } from '@prisma/client';
import fs from 'fs-extra';
import { IUserSafe } from '../../types/user';
import AppError from '../../utils/appError';
import { signJwt } from '../../utils/jwt';
import { IUserUpdateDto, UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';

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
  user,
  twitter,
  esl,
  pseudo,
  email,
  file,
  stormgate,
}: {
  user: IUserSafe;
  twitter?: string;
  esl?: string;
  pseudo: string;
  email: string;
  file: Express.Multer.File | undefined;
  stormgate?: string;
}) {
  const userUpdate: IUserUpdateDto = {
    id: user.id,
    pseudo,
    email,
    esl,
    twitter,
    stormgate,
  };
  try {
    /* file management */
    const fileUpload = file;
    await removeUnusedFiles({ user, fileUpload });
    const avatarUrl = await getAvatarUrl({ user, fileUpload });
    userUpdate.avatar = avatarUrl;

    await UserRepository.updateUser(userUpdate);
  } catch (err: any) {
    throw new AppError(400, 'Erreur lors de la mise à jour du profil.');
  }
}

export async function getUserInformations(userId: string) {
  return await UserRepository.getUserInformations(userId);
}

async function removeUnusedFiles({
  user,
  fileUpload,
}: {
  user: IUserSafe;
  fileUpload: Express.Multer.File | undefined;
}) {
  if (!fileUpload) return;
  if (user.avatar) {
    const fileToRemoveName = user.avatar?.split('/uploads/')[1];
    await fs.unlink(`public/uploads/${fileToRemoveName}`);
  }
}

async function getAvatarUrl({
  user,
  fileUpload,
}: {
  user: IUserSafe;
  fileUpload: Express.Multer.File | undefined;
}) {
  if (!fileUpload) return user.avatar;
  return `${process.env.SERVER_URL}/uploads/${fileUpload.filename}`;
}
export const getAllUsersActive = async () => {
  return await UserRepository.getAllUsersActive();
};
