import { Injectable } from '@nestjs/common';
import { Loan } from '@prisma/client';
import { IdNotFoundException } from '../utils/errors/idnotfound';
import { LoanRepository } from 'src/infra/loan/repository/loan.repository';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { TypeException } from '../utils/errors/type-exists';
import { UpdateLoanDTO } from './dto/update-loan';

@Injectable()
export class LoanService {
  constructor(private readonly loanRepository: LoanRepository) {}

  async create(createLoanDTO: CreateLoanDTO): Promise<Loan> {
    const { type } = createLoanDTO;

    const isTypeLoanAlreadyExists = await this.loanRepository.findByType(type);

    if (isTypeLoanAlreadyExists) {
      throw new TypeException();
    }

    const createLoad = {
      type: createLoanDTO.type,
      interest_rate: createLoanDTO.interest_rate,
    };

    const createdLoad = await this.loanRepository.create(createLoad);

    return {
      ...createdLoad,
    };
  }

  public async findById(id: string): Promise<Loan | null> {
    return await this.loanRepository.findById(id);
  }

  async update(id: string, updateLoanDTO: UpdateLoanDTO): Promise<Loan> {
    const findLoan = await this.loanRepository.findById(id);

    if (!findLoan) {
      throw new IdNotFoundException(id);
    }

    const updateLoan = await this.loanRepository.update(id, updateLoanDTO);

    return {
      ...updateLoan,
    };
  }

  async remove(id: string): Promise<void> {
    await this.loanRepository.delete(id);
  }
}
