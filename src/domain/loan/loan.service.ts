import { Injectable } from '@nestjs/common';
import { Loan } from '@prisma/client';
import { IdNotFoundException } from '../utils/errors/idnotfound';
import { LoanRepository } from 'src/infra/loan/repository/loan.repository';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { TypeException } from '../utils/errors/type-exists';
import { UpdateLoanDTO } from './dto/update-loan';

export interface ILoanRequirements {
  cpf: string;
  name: string;
  income: number;
  age: number;
  location: string;
}
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

  async userPermittedLoans(loanRequirements: ILoanRequirements) {
    const { age, cpf, income, location, name } = loanRequirements;

    let loanApproved = [];

    if (income <= 3000) {
      const personalLoan = await this.loanRepository.findByType('pessoal');
      if (personalLoan != null) {
        loanApproved.push(personalLoan);
      }
    }

    if (
      income >= 3000 &&
      income <= 5000 &&
      age < 30 &&
      (location === 'SP' ||
        location === 'São Paulo' ||
        location === 'são paulo')
    ) {
      const personalLoan = await this.loanRepository.findByType('pessoal');
      if (personalLoan !== null) {
        loanApproved.push(personalLoan);
      }
    }

    if (income >= 5000) {
      const payrollLoan = await this.loanRepository.findByType('consignado');
      if (payrollLoan !== null) {
        loanApproved.push(payrollLoan);
      }
    }

    if (income <= 3000) {
      const securedLoan = await this.loanRepository.findByType(
        'emprestimo com garantia',
      );
      if (securedLoan != null) {
        loanApproved.push(securedLoan);
      }
    }

    if (
      income >= 3000 &&
      income <= 5000 &&
      age < 30 &&
      (location === 'SP' ||
        location === 'São Paulo' ||
        location === 'são paulo')
    ) {
      const securedLoan = await this.loanRepository.findByType(
        'emprestimo com garantia',
      );
      if (securedLoan != null) {
        loanApproved.push(securedLoan);
      }
    }

    return {
      ...loanApproved,
    };
  }

  public async findById(id: string): Promise<Loan | null> {
    return await this.loanRepository.findById(id);
  }

  public async findAll(): Promise<Loan[] | null> {
    return await this.loanRepository.findAll();
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
