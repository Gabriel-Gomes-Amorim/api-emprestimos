import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(input: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: input,
    });
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const findUser = this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return findUser;
  }

  update(id: string, input: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      data: input,
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
