import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database';
import { Loan } from '@prisma/client';

@Injectable()
export class LoanRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(input: Prisma.LoanCreateInput) {
    return this.prismaService.loan.create({
      data: input,
    });
  }

  async findByType(type: string): Promise<Loan | null> {
    const findLoan = this.prismaService.loan.findUnique({
      where: {
        type,
      },
    });
    return findLoan;
  }

  async findById(id: string): Promise<Loan | null> {
    const findLoan = this.prismaService.loan.findUnique({
      where: {
        id,
      },
    });
    return findLoan;
  }

  update(id: string, input: Prisma.UserUpdateInput) {
    return this.prismaService.loan.update({
      data: input,
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.prismaService.loan.delete({
      where: {
        id,
      },
    });
  }
}
