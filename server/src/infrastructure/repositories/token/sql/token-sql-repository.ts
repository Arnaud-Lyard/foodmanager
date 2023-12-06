/* eslint-disable @typescript-eslint/no-explicit-any */
import { RepositoryError } from '../../../../application/errors/repository-error';
import { CreateTokenRepository } from '../../../../application/ports/repositories/token/create-token-repository';
import { DeleteTokenByUserIdRepository } from '../../../../application/ports/repositories/token/delete-token-by-user-id-repository';
import { FindTokenByIdRepository } from '../../../../application/ports/repositories/token/find-token-by-id-repository';
import { FindTokenByTokenRepository } from '../../../../application/ports/repositories/token/find-token-by-token-repository';
import { FindTokenByUserIdRepository } from '../../../../application/ports/repositories/token/find-token-by-user-id-repository';
import { Token } from '../../../../domain/models/token/token';
import { TokenRequestModel } from '../../../../domain/models/token/token-request-model';
import db from '../../../../infrastructure/prisma/connection';

export class TokenSqlRepository
  implements
    FindTokenByTokenRepository,
    FindTokenByIdRepository,
    FindTokenByUserIdRepository,
    CreateTokenRepository,
    DeleteTokenByUserIdRepository
{
  async findByToken(token: string): Promise<Token | null> {
    const foundToken = await db.token.findFirst({
      where: {
        token,
        expiresIn: {
          gt: new Date(),
        },
      },
    });
    if (!foundToken) return null;
    return {
      id: foundToken.id,
      token: foundToken.token,
      userId: foundToken.userId,
      expiresIn: foundToken.expiresIn,
    };
  }

  async findById(id: string): Promise<Token | null> {
    const foundToken = await db.token.findFirst({
      where: {
        id,
        expiresIn: {
          gt: new Date(),
        },
      },
    });
    if (!foundToken) return null;
    return {
      id: foundToken.id,
      token: foundToken.token,
      userId: foundToken.userId,
      expiresIn: foundToken.expiresIn,
    };
  }

  async findByUserId(userId: string): Promise<Token | null> {
    const foundToken = await db.token.findFirst({
      where: {
        userId,
        expiresIn: {
          gt: new Date(),
        },
      },
    });
    if (!foundToken) return null;
    return {
      id: foundToken.id,
      token: foundToken.token,
      userId: foundToken.userId,
      expiresIn: foundToken.expiresIn,
    };
  }

  async create(tokenModel: TokenRequestModel): Promise<Token> | never {
    if (!tokenModel || !tokenModel.userId || !tokenModel.token) {
      throw new RepositoryError('Cannot create token without the values');
    }
    try {
      return await db.$transaction(async (tx) => {
        await tx.token.deleteMany({
          where: {
            userId: tokenModel.userId,
          },
        });
        const newToken = await tx.token.create({
          data: {
            userId: tokenModel.userId,
            token: tokenModel.token,
            expiresIn: tokenModel.expiresIn,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        return {
          id: newToken.id,
          token: newToken.token,
          userId: newToken.userId,
          expiresIn: newToken.expiresIn,
        };
      });
    } catch (error: any) {
      const repositoryError = new RepositoryError('Could not create token');
      repositoryError.stack = error.stack;
      throw repositoryError;
    }
  }
  async deleteByUserId(userId: string): Promise<number> {
    const deleted = await db.token.deleteMany({
      where: {
        userId,
      },
    });
    return deleted.count;
  }
}
