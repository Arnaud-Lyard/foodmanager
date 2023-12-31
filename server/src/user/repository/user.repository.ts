import { Prisma, User } from "@prisma/client";
import prisma from "../../../prisma/client";
import { UserDto } from "../dto/user.dto";
import { UserArgs } from "@prisma/client/runtime/library";

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

  static async findByUserId(userId: string): Promise<User | null> {
    const select = this.excludeFields<Prisma.UserFieldRefs>(
      prisma.user.fields,
      [
        "password",
        "verified",
        "verificationCode",
        "passwordResetAt",
        "passwordResetToken",
      ]
    );
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select,
    });
    return user;
  }

  static excludeFields<T>(fields: T, excludes: (keyof T)[]): BooleanObject<T> {
    let keys = Object.keys(fields!).filter(
      (key) => !excludes.includes(key as keyof T)
    ) as (keyof T)[];
    let object: BooleanObject<T> = {};
    for (let key of keys) {
      object[key] = true;
    }
    return object;
  }
}

type BooleanObject<T> = {
  [K in keyof T]?: boolean;
};
