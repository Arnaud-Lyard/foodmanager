import { User } from '@prisma/client';
import prisma from '../../../prisma/client';
import { IUserSafe } from '../../types/user';
import { UserDto } from '../dto/user.dto';

export class UserRepository {
  static async createUser(user: UserDto): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }

  static async switchVerificationCode({
    userId,
    verificationCode,
  }: {
    userId: string;
    verificationCode: string | null;
  }): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { verificationCode },
    });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email },
    });
  }

  static async findUserByVerificationCode(
    verificationCode: string
  ): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { verificationCode },
    });
  }

  static async verifyUser(userId: string): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { verified: true, verificationCode: null },
    });
  }

  static async updateResetPasswordToken({
    userId,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    passwordResetToken: string | null;
    passwordResetAt: Date | null;
  }): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { passwordResetToken, passwordResetAt },
    });
  }

  static async findUserByPasswordResetToken(
    passwordResetToken: string
  ): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { passwordResetToken, passwordResetAt: { gt: new Date() } },
    });
  }

  static async updateUserPassword({
    userId,
    hashedPassword,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    hashedPassword: string;
    passwordResetToken: null;
    passwordResetAt: null;
  }): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, passwordResetToken, passwordResetAt },
    });
  }

  static async saveUserImage({
    userId,
    imageUrl,
  }: {
    userId: string;
    imageUrl: string;
  }): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { avatar: imageUrl },
    });
  }

  static async findByUserId(userId: string): Promise<IUserSafe | null> {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        pseudo: true,
        email: true,
        grade: true,
        avatar: true,
        esl: true,
        twitter: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  static async getTeamUsers(): Promise<IUserSafe[]> {
    return await prisma.user.findMany({
      where: {
        OR: [{ grade: 'player' }, { grade: 'manager' }],
      },
      select: {
        id: true,
        pseudo: true,
        email: true,
        grade: true,
        avatar: true,
        esl: true,
        twitter: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async updateUser({
    userId,
    twitter,
    esl,
    pseudo,
    email,
    avatar,
  }: {
    userId: string;
    twitter?: string;
    esl?: string;
    pseudo: string;
    email: string;
    avatar: string | null | undefined;
  }) {
    return await prisma.user.update({
      where: { id: userId },
      data: { twitter, esl, pseudo, avatar },
    });
  }
}
